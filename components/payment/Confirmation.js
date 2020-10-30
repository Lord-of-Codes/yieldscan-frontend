import { useState, useEffect } from "react";
import { get } from "lodash";
import {
	Stack,
	Icon,
	Text,
	Link,
	Collapse,
	Button,
	Divider,
	Alert,
	AlertDescription,
	AlertIcon,
} from "@chakra-ui/core";
import { ChevronRight, ChevronDown } from "react-feather";
import Identicon from "@components/common/Identicon";
import formatCurrency from "@lib/format-currency";
import Transaction from "./Transaction";
import convertCurrency from "@lib/convert-currency";
import RewardDestination from "./RewardDestination";
import TermsAndServicePopover from "@components/payment/TermsOfService";

const ValidatorInfo = ({
	name,
	stashId,
	riskScore,
	amountPerValidator,
	networkInfo,
}) => (
	<div className="mr-2 flex items-center rounded-lg border border-gray-200 px-3 py-2 mb-2 w-full mt-1 text-gray-700">
		<div className="mr-4">
			<Identicon address={stashId} size="2.5rem" />
		</div>
		<div className="flex flex-col items-start">
			<h3 className="font-medium text-sm">
				{name
					? name.length > 16
						? name.slice(0, 6) + "..." + name.slice(-6)
						: name
					: stashId.slice(0, 6) + "..." + stashId.slice(-6) || "-"}
			</h3>
			{/* <span className="flex items-center text-gray-500 text-sm rounded-full border border-gray-200 mt-1 pl-4">
				<span className="text-xs">Risk Score</span>
				<RiskTag
					risk={Number(riskScore).toFixed(2)}
					classes="ml-2 px-4 py-1 rounded-full text-xs"
				/>
			</span> */}
		</div>
		<div className="flex flex-col ml-auto">
			<span className="font-semibold text-xs">Est. Stake</span>
			<h5 className="text-sm">
				{formatCurrency.methods.formatAmount(
					Math.trunc(amountPerValidator * 10 ** networkInfo.decimalPlaces),
					networkInfo
				)}
			</h5>
		</div>
	</div>
);

// TODO: currency conversion in Confirmation for `stakingAmount`
const Confirmation = ({
	transactionState,
	setTransactionState,
	stashAccount,
	accounts,
	stakingLoading,
	setController,
	bondedAmount,
	hasAgreed,
	setHasAgreed,
	transactionFee,
	onConfirm,
	networkInfo,
}) => {
	const stakingAmount = get(transactionState, "stakingAmount", 0);
	const selectedValidators = get(transactionState, "selectedValidators", []);
	const bonded = {
		currency: get(bondedAmount, "currency", 0),
		subCurrency: get(bondedAmount, "subCurrency", 0),
	};

	const [tcPopoverOpen, setTCPopoverOpen] = useState(false);
	const [showValidators, setShowValidators] = useState(false);
	const [subCurrency, setSubCurrency] = useState(0);
	const [subFeeCurrency, setFeeSubCurrency] = useState(0);
	const handleValToggle = () => setShowValidators(!showValidators);
	const [showAdvPrefs, setShowAdvPrefs] = useState(false);
	const handleAdvPrefsToggle = () => setShowAdvPrefs(!showAdvPrefs);

	useEffect(() => {
		convertCurrency(stakingAmount, networkInfo.denom).then(
			(convertedAmount) => {
				setSubCurrency(convertedAmount);
			}
		);
	}, []);

	useEffect(() => {
		convertCurrency(
			transactionFee / Math.pow(10, networkInfo.decimalPlaces),
			networkInfo.denom
		).then((convertedAmount) => {
			setFeeSubCurrency(convertedAmount);
		});
	}, [transactionFee]);

	return (
		<div className="mt-8 items-center text-gray-700">
			<h1 className="text-2xl font-semibold text-center">Confirmation</h1>
			<p className="text-gray-600 text-sm text-center">
				Staking returns are subject to market risks. <br />
				Please read the{" "}
				<Link href="/terms" className="text-blue-400" isExternal>
					Terms of Service
				</Link>{" "}
				before investing.{" "}
			</p>
			<h1 className="text-xl font-semibold mt-4">Account</h1>
			<div className="mr-2 flex items-center rounded-lg bg-gray-100 border border-gray-200 px-3 py-2 mb-2 w-full mt-4">
				<Identicon address={stashAccount.address} size="3rem" />
				<div className="ml-2 flex flex-col">
					<h3 className="font-medium">{stashAccount.meta.name}</h3>
					<span className="text-xs text-gray-600">{stashAccount.address}</span>
				</div>
			</div>
			<button
				onClick={handleValToggle}
				className="flex text-gray-600 text-xs mt-4"
			>
				<ChevronRight
					size={16}
					className={`transition ease-in-out duration-500 mr-2 ${
						showValidators && "transform rotate-90"
					}`}
				/>
				{showValidators ? "Hide" : "Show"} suggested validators
			</button>
			<Collapse isOpen={showValidators}>
				<div className="mt-2 rounded-xl mb-8">
					<div className="mb-4 overflow-auto" style={{ height: "12rem" }}>
						{selectedValidators.map((validator) => (
							<ValidatorInfo
								key={validator.stashId}
								name={validator.name || validator.stashId}
								stashId={validator.stashId}
								riskScore={validator.riskScore}
								amountPerValidator={Number(
									stakingAmount / selectedValidators.length
								)}
								networkInfo={networkInfo}
							/>
						))}
					</div>
				</div>
			</Collapse>

			<button
				className="flex text-gray-600 text-xs mt-2"
				onClick={handleAdvPrefsToggle}
			>
				<ChevronRight
					size={16}
					className={`transition ease-in-out duration-500 mr-2 ${
						showAdvPrefs && "transform rotate-90"
					}`}
				/>
				Advanced preferences
			</button>
			<Collapse isOpen={showAdvPrefs}>
				<div className="mt-6 rounded-xl mt-4">
					<Transaction
						accounts={accounts}
						stashAccount={stashAccount}
						stakingLoading={stakingLoading}
						transactionState={transactionState}
						setController={setController}
						networkInfo={networkInfo}
					/>
					<RewardDestination
						stashAccount={stashAccount}
						transactionState={transactionState}
						setTransactionState={setTransactionState}
						networkInfo={networkInfo}
					/>
				</div>
			</Collapse>

			<div className="w-full mt-8">
				<div className="flex justify-between">
					<p className="text-gray-700 text-xs">Staking amount</p>
					<div className="flex flex-col">
						<p className="text-sm font-semibold text-right">
							{formatCurrency.methods.formatAmount(
								Math.trunc(stakingAmount * 10 ** networkInfo.decimalPlaces),
								networkInfo
							)}
						</p>
						<p className="text-xs text-right text-gray-600">
							${subCurrency.toFixed(2)}
						</p>
					</div>
				</div>

				<div className="flex justify-between mt-4">
					<p className="text-gray-700 text-xs">Transaction Fee</p>

					<div className="flex flex-col">
						<p className="text-sm font-semibold text-right">
							{formatCurrency.methods.formatAmount(transactionFee, networkInfo)}
						</p>
						<p className="text-xs text-right text-gray-600">
							${subFeeCurrency.toFixed(2)}
						</p>
					</div>
				</div>
				<Divider my={6} />
				<div className="flex justify-between">
					<p className="text-gray-700 text-sm font-semibold">Total Amount</p>
					<div className="flex flex-col">
						<p className="text-lg text-right font-bold">
							{formatCurrency.methods.formatAmount(
								Math.trunc(stakingAmount * 10 ** networkInfo.decimalPlaces) +
									transactionFee,
								networkInfo
							)}
						</p>
						<p className="text-sm text-right text-gray-600 font-medium">
							${(subCurrency + subFeeCurrency).toFixed(2)}
						</p>
					</div>
				</div>
			</div>

			{/* <div className="mt-6 flex">
				<Alert
					status="warning"
					color="#FDB808"
					backgroundColor="#FFF4DA"
					borderRadius="8px"
				>
					<AlertIcon name="info-outline" />
					<AlertDescription color="#FDB808" fontSize="14px">
						<strong>Warning:</strong> After investing, your funds will be locked
						and will remain locked after withdrawing (triggering unlock) for
						approximately <strong>{networkInfo.lockUpPeriod} days</strong>.
					</AlertDescription>
				</Alert>
			</div> */}
			<div className="mt-4 w-full text-center">
				<button
					className="rounded-full font-medium px-12 py-3 bg-teal-500 text-white"
					onClick={() => onConfirm()}
				>
					Invest Now
				</button>
			</div>
			<TermsAndServicePopover
				tcPopoverOpen={tcPopoverOpen}
				setTCPopoverOpen={setTCPopoverOpen}
				setHasAgreed={setHasAgreed}
				onConfirm={onConfirm}
			/>
		</div>
	);
};

export default Confirmation;
