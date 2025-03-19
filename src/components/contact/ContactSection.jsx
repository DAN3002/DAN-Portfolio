/* eslint-disable no-undef */
import React, { useRef, useState } from 'react';
import Turnstile, { useTurnstile } from 'react-turnstile';
import data from '../../data/data';

const TURNSTILE_SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY;
const EMAIL_API_ENDPOINT = process.env.REACT_APP_EMAIL_API_ENDPOINT;

function ContactSection() {
	const form = useRef();
	const turnstile = useTurnstile();
	const turnstileRef = useRef(null); // Add ref for Turnstile
	const { contactEmail } = data;
	const [turnstileToken, setTurnstileToken] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const sendEmail = async (e) => {
		e.preventDefault();

		// Ensure the Turnstile verification is complete before submitting
		if (!turnstileToken) {
			Swal.fire({
				icon: 'error',
				title: 'Verification required',
				text: 'Please complete the security verification first.',
			});
			return;
		}

		setIsSubmitting(true);

		// Show loading modal
		Swal.fire({
			// title: 'Sending message...',
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});

		// Create FormData from form
		const formData = new FormData(form.current);

		// Process the message to preserve newlines
		// const message = formData.get('message');
		// if (message) {
		// 	// First sanitize the input to prevent HTML/JS injection
		// 	const sanitizedMessage = message
		// 		.replace(/>/g, '&gt;')
		// 		.replace(/&/g, '&amp;')
		// 		.replace(/"/g, '&quot;')
		// 		.replace(/'/g, '&#039;');

		// 	// Then replace newlines with HTML breaks for email clients
		// 	formData.set('message', sanitizedMessage.replace(/\n/g, '<br />'));
		// }

		// Add turnstile token to FormData
		formData.append('cf-turnstile-response', turnstileToken);

		try {
			// Replace with your actual Cloudflare Worker URL
			const response = await fetch(EMAIL_API_ENDPOINT, {
				method: 'POST',
				// No Content-Type header needed - browser will set it automatically with boundary
				body: formData, // Send as FormData directly
			});

			if (!response.ok) {
				if (response.status === 403) {
					throw new Error('Capcha verification failed. Please complete the security check again.');
				}
				throw new Error('Email sending failed');
			}

			// Reset form on success
			form.current.reset();

			Swal.close();
			Swal.fire({
				icon: 'success',
				title: 'Thank you!',
				text: 'I will contact you as soon as possible.',
			});
		} catch (error) {
			Swal.close();
			Swal.fire({
				icon: 'error',
				title: 'Something went wrong',
				text: error.message || 'Failed to send your message. Please try again.',
			});
		} finally {
			// Always reset Turnstile regardless of success or failure
			setTurnstileToken(null);
			if (turnstileRef.current) {
				turnstileRef.current.reset();
			}
			turnstile.reset();
			setIsSubmitting(false);
		}
	};

	return (
		<div className="row">
			<div className="spacer" data-height={60} style={{ height: 60 }} />
			<div className="col-md-4">
				{/* contact info */}
				<div className="contact-info">
					<h3 className="wow fadeInUp">Let's talk about everything!</h3>
					<p className="wow fadeInUp">
						Don't like forms? Send me an
						{' '}
						<a href={`mailto:${contactEmail}`}>email</a>
						. 👋
					</p>
				</div>
			</div>
			<div className="col-md-8">
				<form
					id="contact-form"
					className="contact-form mt-6"
					onSubmit={sendEmail}
					ref={form}
				>
					<div className="messages" />
					<div className="row">
						<div className="column col-md-6">
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									name="from_name"
									placeholder="Your name"
									required="required"
									data-error="Name is required."
								/>
								<div className="help-block with-errors" />
							</div>
						</div>
						<div className="column col-md-6">
							<div className="form-group">
								<input
									type="email"
									className="form-control"
									name="to_email"
									placeholder="Email address"
									required="required"
									data-error="Email is required."
								/>
								<div className="help-block with-errors" />
							</div>
						</div>
						<div className="column col-md-12">
							<div className="form-group">
								<textarea
									name="message"
									className="form-control"
									rows={5}
									placeholder="Message"
									required="required"
									data-error="Message is required."
									defaultValue=""
									style={{ resize: 'none' }}
								/>
								<div className="help-block with-errors" />
							</div>
						</div>

						{/* Cloudflare Turnstile */}
						<div className="column col-md-12">
							<div className="form-group turnstile-container">
								<Turnstile
									ref={turnstileRef}
									sitekey={TURNSTILE_SITE_KEY}
									onVerify={(token) => setTurnstileToken(token)}
									onExpire={() => setTurnstileToken(null)}
									theme="light"
								/>
							</div>
						</div>
					</div>
					<button
						type="submit"
						name="submit"
						id="submit"
						value="Submit"
						className="btn btn-default"
						disabled={isSubmitting || !turnstileToken}
					>
						{isSubmitting ? 'Sending...' : 'Send Message'}
					</button>
				</form>
			</div>
		</div>
	);
}

export default ContactSection;
