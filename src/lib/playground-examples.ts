type PlaygroundExample = {
  title: string;
  language: 'java' | 'blocks';
  robot: 'tank' | 'mecanum';
  entryClass: string;
  code: string;
};

// The embed's tank template uses descriptive hardware names and reverses the
// right-side motors. These examples target that simulated configuration.
function driveProgram(className: string, body: string, teleop = false, settings = ''): string {
  const annotation = teleop ? 'TeleOp' : 'Autonomous';
  return `package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.${annotation};
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.util.ElapsedTime;

@${annotation}(name = "${className}")
public class ${className} extends LinearOpMode {
${settings ? settings.split('\n').map(line => `    ${line}`).join('\n') + '\n\n' : ''}    private DcMotor[] motors;

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

// FTC .blk files contain a Blockly workspace followed by FTC OpMode metadata.
// These identifiers are the simulator's Blocks aliases for its four drive motors.
function blocksSequence(): string {
  const motors = [1, 2, 3, 4].map(number => `ftcsimMotor${number}AsDcMotor`);
  const number = (value: number) => `<shadow type="math_number"><field name="NUM">${value}</field></shadow>`;
  const chain = (blocks: string[]) => blocks.reduceRight((next, block) => next ? block.replace(/<\/block>$/, `<next>${next}</next></block>`) : block, '');
  const call = (name: string) => `<block type="procedures_callnoreturn"><mutation name="${name}"></mutation></block>`;
  const drive = (power: number) => `<block type="procedures_callnoreturn"><mutation name="drive"><arg name="power"></arg></mutation><value name="ARG0">${number(power)}</value></block>`;
  const sleep = (milliseconds: number) => `<block type="linearOpMode_sleep_Number"><value name="MILLISECONDS">${number(milliseconds)}</value></block>`;
  const setup = chain([motors[1], motors[3]].map(identifier => `<block type="dcMotor_setProperty_Direction"><field name="IDENTIFIER">${identifier}</field><field name="PROP">Direction</field><value name="VALUE"><block type="dcMotor_typedEnum_direction"><field name="DIRECTION">REVERSE</field></block></value></block>`));
  const driveBody = chain(motors.map(identifier => `<block type="dcMotor_setProperty_Number"><field name="IDENTIFIER">${identifier}</field><field name="PROP">Power</field><value name="VALUE"><block type="variables_get"><field name="VAR" id="drive-power">power</field></block></value></block>`));
  const sequence = chain([
    call('setup'),
    '<block type="linearOpMode_waitForStart"></block>',
    drive(0.25), sleep(700),
    drive(0), sleep(300),
    drive(-0.25), sleep(700),
    drive(0),
  ]);
  return `<xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id="drive-power">power</variable></variables><block type="procedures_defnoreturn" id="sequence" deletable="false" x="16" y="16"><field name="NAME">runOpMode</field><statement name="STACK">${sequence}</statement></block><block type="procedures_defnoreturn" collapsed="true" x="16" y="750"><mutation><arg name="power" varid="drive-power"></arg></mutation><field name="NAME">drive</field><statement name="STACK">${driveBody}</statement></block><block type="procedures_defnoreturn" collapsed="true" x="16" y="810"><field name="NAME">setup</field><statement name="STACK">${setup}</statement></block></xml><?xml version='1.0' encoding='UTF-8' standalone='yes' ?><Extra><OpModeMeta flavor="AUTONOMOUS" group="CrocoDocs" autoTransition="" /><Enabled value="true" /></Extra>`;
}

export const playgroundExamples = {
  'blocks-sequence': {
    title: 'Drive, wait, reverse',
    language: 'blocks',
    robot: 'mecanum',
    entryClass: 'SequencePractice',
    code: blocksSequence(),
  },
  'first-opmode': {
    title: 'Drive with a gamepad',
    language: 'java',
    robot: 'tank',
    entryClass: 'GamepadPractice',
    code: driveProgram('GamepadPractice', `while (opModeIsActive()) {
    double forward = -gamepad1.left_stick_y;
    setDrivePower(forward * speed);
    idle();
}`, true, 'private double speed = 0.25;'),
  },
  'java-numbers': {
    title: 'Integer and decimal division',
    language: 'java',
    robot: 'tank',
    entryClass: 'NumberPractice',
    code: driveProgram('NumberPractice', `setDrivePower(power);
sleep(1000);`, false, `// Try 1.0 / 2 instead of 1 / 2.
private double power = 1 / 2;`),
  },
  'motor-power': {
    title: 'Power and direction',
    language: 'java',
    robot: 'tank',
    entryClass: 'PowerPractice',
    code: driveProgram('PowerPractice', `ElapsedTime timer = new ElapsedTime();
while (opModeIsActive() && timer.seconds() < durationSeconds) {
    setDrivePower(power);
    idle();
}`, false, `private double power = 0.25;
private double durationSeconds = 1.0;`),
  },
  'nonblocking': {
    title: 'A timed button action',
    language: 'java',
    robot: 'tank',
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

    if (gamepad1.b || (running && timer.seconds() >= durationSeconds)) {
        running = false;
    }
    setDrivePower(running ? 0.25 : 0.0);
    idle();
}`, true, 'private double durationSeconds = 1.0;'),
  },
} satisfies Record<string, PlaygroundExample>;

export type PlaygroundExampleId = keyof typeof playgroundExamples;

export function playgroundUrl(example: PlaygroundExample, theme: 'light' | 'dark'): string {
  const params = new URLSearchParams({
    language: example.language,
    theme,
    robot: example.robot,
    field: 'empty',
    camera: 'field',
    singleFile: 'true',
    entryClass: example.entryClass,
    code: example.code,
  });
  return `https://ftcsimulator.crimsoncrocs.org/embed?${params}`;
}
