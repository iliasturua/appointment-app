import { useState, useEffect } from "react";
import { Steps, Form, message, Spin } from "antd";
import api from "../api/api";
import { Appointment } from "../types/appointment.types";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import "../styles/AppointmentStepper.css";

const { Step } = Steps;

const AppointmentStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [appointment, setAppointment] = useState<Appointment>({
    firstName: "",
    lastName: "",
    email: "",
    dateTime: null,
  });

  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await api.me();
      if (response.status === 200) {
        const { name, email } = response.data.data;
        const [firstName, lastName] = name.split(" ");
        setAppointment({ ...appointment, firstName, lastName, email });
      }
    } catch (error) {
      message.error("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await api.submit(appointment);
      if (response.status === 200) {
        message.success("Submitted successfully");
        setCurrentStep(currentStep + 1);
      } else {
        message.error(response.data.message);
        message.error("Try Again!");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="appointment-stepper-container">
      <div className="steps-container">
        <Steps current={currentStep}>
          <Step title="Step 1" />
          <Step title="Step 2" />
        </Steps>
      </div>
      <div className="form-container">
        {loading ? (
          <Spin />
        ) : (
          <div>
            <Form
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={appointment}
              className="form"
            >
              {currentStep === 0 ? (
                <FirstStep
                  appointment={appointment}
                  setAppointment={setAppointment}
                  handleNextStep={handleNextStep}
                />
              ) : (
                <SecondStep
                  appointment={appointment}
                  setAppointment={setAppointment}
                  handlePrevStep={handlePrevStep}
                  handleSubmit={handleSubmit}
                />
              )}
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentStepper;
