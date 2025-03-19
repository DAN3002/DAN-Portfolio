// Helper function to create responses with CORS headers
function createResponse(body, status, corsHeaders) {
	const response = new Response(body, { status });
	for (const [key, value] of Object.entries(corsHeaders)) {
		response.headers.set(key, value);
	}
	return response;
}

// Function to sanitize user input to prevent XSS attacks
function sanitizeInput(input) {
	if (!input || typeof input !== 'string') return '';
	return input
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/&(?!(lt|gt|quot|amp|#039);)/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

// Function to verify Turnstile token
async function verifyTurnstileToken(token, secretKey, request) {
	const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
	const ip = request.headers.get("CF-Connecting-IP");

	// Using FormData for verification
	let formData = new FormData();
	formData.append("secret", secretKey);
	formData.append("response", token);
	if (ip) {
		formData.append("remoteip", ip);
	}

	const response = await fetch(verifyUrl, {
		method: "POST",
		body: formData,
	});

	const data = await response.json();
	return data.success;
}

// Function to send email via EmailJS
async function sendEmail(formData, serviceId, templateId, userId, accessToken) {
	const payload = {
		service_id: serviceId,
		template_id: templateId,
		user_id: userId,
		template_params: formData,
		accessToken: accessToken,
	};
	const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	return response.ok;
}

async function readRequestBody(request) {
	const contentType = request.headers.get("content-type") || "";
	if (contentType.includes("application/json")) {
		return await request.json();
	} else if (contentType.includes("application/text") || contentType.includes("text/html")) {
		return await request.text();
	} else if (contentType.includes("form")) {
		const formData = await request.formData();
		const body = {};
		for (const [key, value] of formData.entries()) {
			body[key] = value;
		}
		return body;
	} else {
		// Handle other content types if necessary
		return null;
	}
}

export default {
	async fetch(request, env, ctx) {
		// Get the origin from the request headers
		const origin = request.headers.get('Origin');

		// Array of allowed origin patterns
		const allowedOrigins = [
			/^https?:\/\/localhost:3000$/,                // Allows http://localhost:3000 and https://localhost:3000
			/^https?:\/\/([\w-]+\.)*dan3002\.tech$/,        // Allows any subdomain of dan3002.tech
			/^https?:\/\/([\w-]+\.)*dan3002\.id\.vn$/       // Allows any subdomain of dan3002.id.vn
		];

		// Check if the origin matches any allowed pattern
		const isAllowed = origin && allowedOrigins.some(pattern => pattern.test(origin));

		// Set CORS headers if the origin is allowed
		let corsHeaders = {};
		if (isAllowed) {
			corsHeaders['Access-Control-Allow-Origin'] = origin;
			corsHeaders['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
			corsHeaders['Access-Control-Allow-Headers'] = 'Content-Type';
			corsHeaders['Vary'] = 'Origin';
		}

		// Handle preflight OPTIONS request
		if (request.method === 'OPTIONS') {
			return createResponse(null, 204, corsHeaders);
		}

		// Only allow POST requests
		if (request.method !== 'POST') {
			return createResponse('Method not allowed', 405, corsHeaders);
		}

		try {
			// Parse the request body as JSON
			const data = await readRequestBody(request);
			const turnstileToken = data["cf-turnstile-response"]

			// Sanitize all user inputs to prevent XSS attacks
			const formData = {
				from_name: sanitizeInput(data.from_name),
				to_email: sanitizeInput(data.to_email),
				message: sanitizeInput(data.message),
			};
			
			// Process newlines in the message after sanitizing
			if (formData.message) {
				// Convert newlines to <br> tags for HTML emails
				formData.message = formData.message.replace(/\n/g, '<br>');
			}

			// Verify Turnstile token
			const isValid = await verifyTurnstileToken(turnstileToken, env.TURNSTILE_SECRET_KEY, request);
			if (!isValid) {
				return createResponse('Invalid Turnstile token', 403, corsHeaders);
			}

			// Send email
			const emailSent = await sendEmail(
				formData,
				env.EMAILJS_SERVICE_ID,
				env.EMAILJS_TEMPLATE_ID,
				env.EMAILJS_USER_ID,
				env.EMAILJS_SECRET_KEY
			);
			if (emailSent) {
				return createResponse('Email sent successfully', 200, corsHeaders);
			} else {
				return createResponse('Failed to send email', 500, corsHeaders);
			}
		} catch (error) {
			console.error(error);
			return createResponse('Invalid JSON in request body', 400, corsHeaders);
		}
	}
};
