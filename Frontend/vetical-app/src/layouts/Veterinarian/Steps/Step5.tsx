const Step5 = ({ nextStep, prevStep }: { nextStep: () => void, prevStep: () => void }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Booking & Payment Options</h2>

            <label className="block">
                <input type="checkbox" /> Online Booking Available
            </label>
            <label className="block">
                <input type="checkbox" /> Walk-ins Accepted
            </label>

            <div className="flex justify-between">
                <button onClick={prevStep} className="px-6 py-3 rounded-lg bg-gray-300">
                    Back
                </button>
                <button onClick={nextStep} className="px-6 py-3 rounded-lg bg-blue-500 text-white">
                    Next
                </button>
            </div>
        </div>
    );
};

export default Step5;
