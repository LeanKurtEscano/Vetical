const Step6 = ({ prevStep }: { prevStep: () => void }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Review & Submit</h2>
            <p>Review all your details before submitting.</p>

            <div className="flex justify-between">
                <button onClick={prevStep} className="px-6 py-3 rounded-lg bg-gray-300">
                    Back
                </button>
                <button className="px-6 py-3 rounded-lg bg-green-500 text-white">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Step6;
