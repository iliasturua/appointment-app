import { Button, DatePicker, Form, message } from "antd";
import { Appointment } from "../types/appointment.types";

export interface InputProps {
  appointment: Appointment;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
  handlePrevStep: () => void;
  handleSubmit: () => Promise<void>;
}

const SecondStep = (props: InputProps) => {
  const { appointment, setAppointment, handlePrevStep, handleSubmit } = props;

  const validateFields = () => {
    if (!appointment.dateTime) {
      message.error("Please select a date and time");
      return;
    }

    handleSubmit();
  };

  const handleDateTimeChange = (dateTime: any) => {
    setAppointment({
      ...appointment,
      dateTime: dateTime ? dateTime.format("YYYY-MM-DD HH:mm:ss") : null,
    });
  };
  return (
    <>
      <Form.Item
        label="Date and Time"
        name="dateTime"
        rules={[{ required: true, message: "Please enter date time" }]}
      >
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          onChange={handleDateTimeChange}
        />
      </Form.Item>
      <Form.Item>
        <Button onClick={handlePrevStep}>Previous</Button>
        <Button type="primary" onClick={validateFields}>
          Submit
        </Button>
      </Form.Item>
    </>
  );
};

export default SecondStep;
