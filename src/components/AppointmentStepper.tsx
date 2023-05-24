import { useState, useEffect } from "react";
import { Steps, Form, message, Spin } from "antd";
import api from "../api/api";
import { Appointment } from "../types/appointment.types";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";

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
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!appointment.dateTime) {
        throw new Error("Date should not be empty");
      }
      const response = await api.submit(appointment);
      if (response.status === 200) {
        message.success("Submitted successfully");
        setCurrentStep(currentStep + 1);
      } else {
        message.error(response.data.message);
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "100px",
      }}
    >
      {loading ? (
        <Spin />
      ) : (
        <div>
          <Steps current={currentStep}>
            <Step title="Step 1" />
            <Step title="Step 2" />
          </Steps>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={appointment}
            style={{ marginTop: "24px" }}
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
  );
};

export default AppointmentStepper;
