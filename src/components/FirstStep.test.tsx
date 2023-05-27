import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import FirstStep from "./FirstStep";
import { Form } from "antd";
import userEvent from "@testing-library/user-event";

describe("FirstStep", () => {
  beforeAll(() => {
    global.matchMedia =
      global.matchMedia ||
      function () {
        return {
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      };
  });

  afterEach(() => {
    cleanup();
  });

  it("is rendering FirstStep component", () => {
    const appointment = {
      firstName: "",
      lastName: "",
      email: "",
      dateTime: null,
    };
    render(
      <Form
        layout="vertical"
        onFinish={() => {}}
        initialValues={appointment}
        className="form"
      >
        <FirstStep
          appointment={appointment}
          setAppointment={() => {}}
          handleNextStep={() => {}}
        />
      </Form>
    );

    expect(screen.getByTestId("firstName")).toBeInTheDocument();
    expect(screen.getByTestId("firstName")).toHaveValue("");

    expect(screen.getByTestId("lastName")).toBeInTheDocument();
    expect(screen.getByTestId("lastName")).toHaveValue("");

    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toHaveValue("");

    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  it("displays an error message when required fields are not filled", async () => {
    const appointment = {
      firstName: "",
      lastName: "",
      email: "",
      dateTime: null,
    };

    render(
      <Form
        layout="vertical"
        onFinish={() => {}}
        initialValues={appointment}
        className="form"
      >
        <FirstStep
          appointment={appointment}
          setAppointment={() => {}}
          handleNextStep={() => {}}
        />
      </Form>
    );

    userEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(
      await screen.findByText("Please fill in all fields")
    ).toBeInTheDocument();
    expect(screen.queryByText("Email address format is invalid")).toBeNull();
  });

  it("displays an error message when the email field is not filled", async () => {
    const appointment = {
      firstName: "Ilia",
      lastName: "Sturua",
      email: "",
      dateTime: null,
    };

    render(
      <Form
        layout="vertical"
        onFinish={() => {}}
        initialValues={appointment}
        className="form"
      >
        <FirstStep
          appointment={appointment}
          setAppointment={() => {}}
          handleNextStep={() => {}}
        />
      </Form>
    );

    userEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(
      await screen.findByText("Please fill in all fields")
    ).toBeInTheDocument();
  });

  it("displays an error message when the email field has an invalid format", async () => {
    const appointment = {
      firstName: "Ilia",
      lastName: "Sturua",
      email: "invalid-email",
      dateTime: null,
    };

    render(
      <Form
        layout="vertical"
        onFinish={() => {}}
        initialValues={appointment}
        className="form"
      >
        <FirstStep
          appointment={appointment}
          setAppointment={() => {}}
          handleNextStep={() => {}}
        />
      </Form>
    );

    userEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(
      await screen.findByText("Email address format is invalid")
    ).toBeInTheDocument();
  });

  it("does not display any error message when all fields are filled correctly", async () => {
    const appointment = {
      firstName: "Ilia",
      lastName: "Sturua",
      email: "iliasturua@example.com",
      dateTime: null,
    };

    render(
      <Form
        layout="vertical"
        onFinish={() => {}}
        initialValues={appointment}
        className="form"
      >
        <FirstStep
          appointment={appointment}
          setAppointment={() => {}}
          handleNextStep={() => {}}
        />
      </Form>
    );

    userEvent.click(screen.getByRole("button", { name: "Next" }));
  });

  it("updates the appointment object when input values change", () => {
    const appointment = {
      firstName: "",
      lastName: "",
      email: "",
      dateTime: null,
    };
    const setAppointment = jest.fn();

    render(
      <Form
        layout="vertical"
        onFinish={() => {}}
        initialValues={appointment}
        className="form"
      >
        <FirstStep
          appointment={appointment}
          setAppointment={setAppointment}
          handleNextStep={() => {}}
        />
      </Form>
    );

    fireEvent.change(screen.getByTestId("firstName"), {
      target: { value: "Ilia" },
    });

    expect(setAppointment).toHaveBeenCalledWith({
      ...appointment,
      firstName: "Ilia",
    });

    fireEvent.change(screen.getByTestId("lastName"), {
      target: { value: "Sturua" },
    });

    expect(setAppointment).toHaveBeenCalledWith({
      ...appointment,
      lastName: "Sturua",
    });

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "iliasturua@example.com" },
    });

    expect(setAppointment).toHaveBeenCalledWith({
      ...appointment,
      email: "iliasturua@example.com",
    });
  });
});
