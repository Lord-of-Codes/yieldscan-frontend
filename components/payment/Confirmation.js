import RiskTag from "@components/reward-calculator/RiskTag";

const ValidatorInfo = () => (
	<div className="rounded-lg flex items-center border border-gray-200 px-4 mb-2">
		<img src="http://placehold.it/255" className="rounded-full w-12 h-12 mr-4" />
		<div className="flex flex-col items-start">
			<h3 className="text-gray-700 text-lg">Validator Name</h3>
			<span className="flex text-gray-500 text-sm">
				Risk Score
				<RiskTag risk={Number(Math.random().toFixed(2))} />
			</span>
		</div>
		<div className="flex flex-col ml-auto">
			<span className="text-red-400">Amount</span>
			<h5 className="text-gray-700">30 KSM</h5>
			<span className="text-gray-500 text-sm">$15</span>
		</div>
	</div>
);

const Confirmation = ({ onConfirm }) => (
	<div className="mt-10">
		<h1 className="text-2xl">Confirmation</h1>
		<span className="text-gray-600">
			You are about to stake your KSM on the following validators. Please make sure you understand the risks before proceeding. Read the <a href="google.com" className="text-blue-500 underline">Terms of Service.</a>
		</span>

		<div className="mt-6 rounded-xl border border-gray-200 px-8 py-3 mt-4">
			{false && <h1 className="text-gray-700 text-2xl">Selected Validators</h1>}
			<div className="flex justify-between items-centerr">
				<div className="flex justify-between items-center rounded-full px-4 py-2 border border-gray-200">
					<span>Estimated Returns</span>
					<div className="ml-2 px-3 py-2 bg-teal-500 text-white rounded-full">200 KSM</div>
				</div>
				<div className="flex justify-between items-center rounded-full px-4 py-2 border border-gray-200">
					<span>Risk Preference</span>
					<div className="ml-2 px-3 py-2 bg-orange-500 text-white rounded-full">Medium</div>
				</div>
			</div>
			<div className="mt-4 overflow-auto" style={{ height: '12rem' }}>
				<ValidatorInfo />
				<ValidatorInfo />
				<ValidatorInfo />
				<ValidatorInfo />
			</div>
		</div>

		<div className="my-5 rounded p-4 bg-gray-900 text-white flex items-center justify-around">
			<div className="rounded p-3 flex flex-col bg-white text-black justify-center">
				<span className="text-teal-500 text-sm font-semibold">Additional Funds to Bond</span>
				<h3 className="text-lg font-semibold">200 KSM</h3>
				<span className="text-gray-700 text-sm">$100</span>
			</div>
			<div className="rounded-lg p-2 flex flex-col text-white justify-center">
				<span className="text-teal-500 text-sm font-semibold">Currently Bonded</span>
				<h3 className="text-lg font-semibold">500 KSM</h3>
				<span className="text-gray-200 text-sm">$250</span>
			</div>
			<div className="rounded-lg p-2 flex flex-col text-white justify-center">
				<span className="text-teal-500 text-sm font-semibold">Total Staking Amount</span>
				<h3 className="text-lg font-semibold">700 KSM</h3>
				<span className="text-gray-200 text-sm">$350</span>
			</div>
		</div>

		<button
			className="px-6 py-2 shadow-lg rounded-lg text-white bg-teal-500"
			onClick={onConfirm}
		>
			Agree and Confirm
		</button>
	</div>
);

export default Confirmation;
