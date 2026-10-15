type PlaygroundExample = {
  title: string;
  entryClass: string;
  code: string;
};

// The embed's tank template uses descriptive hardware names and reverses the
// right-side motors. These examples target that simulated configuration.
function driveProgram(className: string, body: string, teleop = false): string {
  const annotation = teleop ? 'TeleOp' : 'Autonomous';
  return `package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.${annotation};
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.util.ElapsedTime;

@${annotation}(name = "${className}")
public class ${className} extends LinearOpMode {
    private DcMotor[] motors;

    @Override
    public void runOpMode() throws InterruptedException {
        motors = new DcMotor[] {
            hardwareMap.get(DcMotor.class, "frontLeftMotor"),
            hardwareMap.get(DcMotor.class, "frontRightMotor"),
            hardwareMap.get(DcMotor.class, "backLeftMotor"),
            hardwareMap.get(DcMotor.class, "backRightMotor")
        };
        motors[1].setDirection(DcMotor.Direction.REVERSE);
        motors[3].setDirection(DcMotor.Direction.REVERSE);
        for (DcMotor motor : motors) {
            motor.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
        }

        waitForStart();
        if (!opModeIsActive()) return;
        try {
${body.split('\n').map(line => `            ${line}`).join('\n')}
        } finally {
            setDrivePower(0.0);
        }
    }

    private void setDrivePower(double power) {
        for (DcMotor motor : motors) {
            motor.setPower(power);
        }
    }
}
`;
}

export const playgroundExamples = {
  'blocks-sequence': {
    title: 'Drive, wait, reverse',
    entryClass: 'SequencePractice',
    code: driveProgram('SequencePractice', `telemetry.addLine("Forward");
telemetry.update();
setDrivePower(0.25);
sleep(700);
setDrivePower(0.0);
sleep(300);
if (!opModeIsActive()) return;
telemetry.addLine("Reverse");
telemetry.update();
setDrivePower(-0.25);
sleep(700);`),
  },
  'first-opmode': {
    title: 'Read a gamepad',
    entryClass: 'HelloRobot',
    code: `package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;

@TeleOp(name = "Hello Robot", group = "Practice")
public class HelloRobot extends LinearOpMode {
    @Override
    public void runOpMode() {
        telemetry.addLine("Initialized. Press START to read the stick.");
        telemetry.update();

        waitForStart();
        if (!opModeIsActive()) return;

        while (opModeIsActive()) {
            double forward = -gamepad1.left_stick_y;
            telemetry.addData("Forward request", "%.2f", forward);
            telemetry.addData("A pressed", gamepad1.a);
            telemetry.update();
            idle();
        }
    }
}
`,
  },
  'java-numbers': {
    title: 'Integer and decimal division',
    entryClass: 'NumberPractice',
    code: `package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;

@TeleOp(name = "Number Practice")
public class NumberPractice extends LinearOpMode {
    @Override
    public void runOpMode() {
        int numerator = 1;
        int denominator = 2;
        int integerResult = numerator / denominator;
        double decimalResult = (double) numerator / denominator;

        waitForStart();
        if (!opModeIsActive()) return;
        while (opModeIsActive()) {
            telemetry.addData("Integer result", integerResult);
            telemetry.addData("Decimal result", decimalResult);
            telemetry.update();
            idle();
        }
    }
}
`,
  },
  'motor-power': {
    title: 'Power and direction',
    entryClass: 'PowerPractice',
    code: driveProgram('PowerPractice', `double power = 0.25;
double durationSeconds = 1.0;
ElapsedTime timer = new ElapsedTime();

while (opModeIsActive() && timer.seconds() < durationSeconds) {
    setDrivePower(power);
    telemetry.addData("Power", power);
    telemetry.addData("Seconds", "%.2f", timer.seconds());
    telemetry.update();
    idle();
}`),
  },
  'nonblocking': {
    title: 'A timed action without blocking',
    entryClass: 'PulseDrive',
    code: driveProgram('PulseDrive', `boolean previousA = false;
boolean running = false;
ElapsedTime timer = new ElapsedTime();

while (opModeIsActive()) {
    boolean currentA = gamepad1.a;
    if (currentA && !previousA && !running) {
        running = true;
        timer.reset();
    }
    previousA = currentA;

    if (gamepad1.b || (running && timer.seconds() >= 1.0)) {
        running = false;
    }
    setDrivePower(running ? 0.25 : 0.0);

    telemetry.addData("State", running ? "RUNNING" : "IDLE");
    telemetry.addData("Stick still readable", -gamepad1.left_stick_y);
    telemetry.update();
    idle();
}`, true),
  },
} satisfies Record<string, PlaygroundExample>;

export type PlaygroundExampleId = keyof typeof playgroundExamples;

export function playgroundUrl(example: PlaygroundExample): string {
  const params = new URLSearchParams({
    language: 'java',
    robot: 'tank',
    field: 'empty',
    camera: 'follow',
    singleFile: 'true',
    telemetry: 'true',
    entryClass: example.entryClass,
    code: example.code,
  });
  return `https://ftcsimulator.crimsoncrocs.org/embed?${params}`;
}
