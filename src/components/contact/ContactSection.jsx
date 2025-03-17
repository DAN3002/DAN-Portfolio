/* eslint-disable no-undef */
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Turnstile from 'react-turnstile';
import data from '../../data/data';

const EMAILJS_SERVICE_ID = 'service_qbnmecr';
const EMAILJS_TEMPLATE_ID = 'template_r3v7cmp';
// Replace with your actual site key from Cloudflare Turnstile dashboard
const TURNSTILE_SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY;

function ContactSection() {
	const form = useRef();
	const { contactEmail } = data;
	const [turnstileToken, setTurnstileToken] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const sendEmail = (e) => {
		e.preventDefault();

		// Verify Turnstile token exists before sending email
		if (!turnstileToken) {
			Swal.fire({
				icon: 'error',
				title: 'Verification required',
				text: 'Please complete the security verification first.',
			});
			return;
		}

		setIsSubmitting(true);

		// Add the token to the form data for server verification
		const formData = new FormData(form.current);
		formData.append('cf-turnstile-response', turnstileToken);

		emailjs
			.sendForm(
				EMAILJS_SERVICE_ID,
				EMAILJS_TEMPLATE_ID,
				form.current,
				process.env.REACT_APP_EMAILJS_KEY,
			)
			.then(() => {
				// clear form
				form.current.reset();
				// Reset turnstile token
				setTurnstileToken(null);
				Swal.fire({
					icon: 'success',
					title: 'Thank you!',
					text: 'I will contact you as soon as possible.',
				});
			})
			.catch((error) => {
				console.error('Email sending failed:', error);
				Swal.fire({
					icon: 'error',
					title: 'Something went wrong',
					text: 'Failed to send your message. Please try again.',
				});
			})
			.finally(() => {
				setIsSubmitting(false);
			});
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
