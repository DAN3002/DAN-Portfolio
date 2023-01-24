/* eslint-disable no-undef */
import React, { useRef } from 'react';

import emailjs from '@emailjs/browser';

import data from '../../data/data';

const EMAILJS_SERVICE_ID = 'service_qbnmecr';
const EMAILJS_TEMPLATE_ID = 'template_r3v7cmp';

function ContactSection() {
	const form = useRef();
	const { contactEmail } = data;

	const sendEmail = (e) => {
		e.preventDefault();

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
				Swal.fire({
					icon: 'success',
					title: 'Thank you!',
					text: 'I will contact you as soon as possible.',
				});
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
						{/* <div className="column col-md-12">
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									id="InputSubject"
									name="subject"
									placeholder="Subject"
									required="required"
									data-error="Subject is required."
								/>
								<div className="help-block with-errors" />
							</div>
						</div> */}
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
					</div>
					<button
						type="submit"
						name="submit"
						id="submit"
						value="Submit"
						className="btn btn-default"
					>
						Send Message
					</button>
				</form>
			</div>
		</div>
	);
}

export default ContactSection;
