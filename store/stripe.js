import axios from 'axios';

const stripePlanId = 'plan_FGv7FsUNTHA2Xw';

export const state = () => ({
	//data: data
});

// const baseUrl = 'http://localhost:5000';
const baseUrl = 'https://api.stripe.com/v1';
const api = axios.create({
	headers: {
		Authorization: 'Bearer ', //Gere should be Stripe API key
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});

export const getters = {
	getBalance: state => options => {
		var config = { headers: {} };
		config.url = `${baseUrl}/balance`;
		return api.request(config);
	},
	getToken: state => options => {
		var config = { headers: {} };
		config.url = `${baseUrl}/tokens`;
		config.method = 'POST';
		// config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		config.contentType = 'application/x-www-form-urlencoded';
		config.data = `card[number]=${options.cardNumber}&card[exp_month]=${options.expMonth}&card[exp_year]=${options.expYear}&card[cvc]=${options.cvc}`;

		return api.request({ ...config });
	},
	createCustomer: state => options => {
		var config = { headers: {} };
		config.url = `${baseUrl}/customers`;
		config.method = 'post';
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		config.contentType = 'application/x-www-form-urlencoded';
		config.data = `name=${options.fullName}&source=${options.token}&email=${options.email}`;

		return api.request({ ...config });
	},
	createSubscription: state => customer => {
		var config = { headers: {} };
		config.url = `${baseUrl}/subscriptions`;
		config.method = 'post';
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		config.contentType = 'application/x-www-form-urlencoded';
		config.data = `items[0][plan]=${stripePlanId}&customer=${customer}&expand[]=latest_invoice.payment_intent`;

		return api.request({ ...config });
	},
	aprovePayment: state => ({ secret, redirect }) => {
		var config = { headers: {} };
		config.url = `${baseUrl}/payment_intents/${secret}/confirm`;
		config.method = 'post';
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		config.contentType = 'application/x-www-form-urlencoded';
		config.data = `return_url=${redirect}`;

		return api.request({ ...config });
	}
};
