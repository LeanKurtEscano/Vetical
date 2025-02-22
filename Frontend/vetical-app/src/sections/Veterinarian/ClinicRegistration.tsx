import { useState } from "react";
import { motion } from "framer-motion";
import Step1 from "../../layouts/Veterinarian/Steps/Step1";
import Step2 from "../../layouts/Veterinarian/Steps/Step2";
import Step3 from "../../layouts/Veterinarian/Steps/Step3";
import Step4 from "../../layouts/Veterinarian/Steps/Step4";
import Step5 from "../../layouts/Veterinarian/Steps/Step5";
import Step6 from "../../layouts/Veterinarian/Steps/Step6";
import ProgressBar from "../../components/ProgressBar";

const ClinicRegistration = () => {
    const [step, setStep] = useState(1);
    const totalSteps = 6;

    const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
         
            <ProgressBar step={step} totalSteps={totalSteps} />

            <motion.div 
                key={step} 
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.3 }}
            >
                {step === 1 && <Step1 nextStep={nextStep} />}
                {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} />}
                {step === 3 && <Step3 nextStep={nextStep} prevStep={prevStep} />}
                {step === 4 && <Step4 nextStep={nextStep} prevStep={prevStep} />}
                {step === 5 && <Step5 nextStep={nextStep} prevStep={prevStep} />}
                {step === 6 && <Step6 prevStep={prevStep} />}
            </motion.div>
        </div>
    );
};

export default ClinicRegistration;
