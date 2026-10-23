export const starterPhases = [
  {
    title: "Start your team",
    description:
      "Understand FTC and get the people, space, and equipment together.",
    lessons: [
      {
        slug: "first-and-ftc",
        title: "FIRST and FTC",
        description: "The program, the competition, and the people involved.",
      },
      {
        slug: "starting-a-team",
        title: "Starting a team",
        description: "Coaches, registration, permission, and local support.",
      },
      {
        slug: "people-and-meetings",
        title: "People and meetings",
        description: "Share the work and make each meeting useful.",
      },
      {
        slug: "budget-and-equipment",
        title: "Budget and equipment",
        description: "Plan costs, choose a kit, and set up a workspace.",
      },
      {
        slug: "safety",
        title: "Safety",
        description: "Work safely around tools, batteries, and moving robots.",
      },
    ],
  },
  {
    title: "Build your first robot",
    description: "Choose a useful task, build a drive base, and make it move.",
    lessons: [
      {
        slug: "game-and-strategy",
        title: "The game and your strategy",
        description: "Read the rules and choose what your robot should do.",
      },
      {
        slug: "robot-parts",
        title: "Robot parts",
        description:
          "Frames, wheels, motors, servos, sensors, and controllers.",
      },
      {
        slug: "first-build",
        title: "Your first build",
        description: "Assemble a drive base and test a simple mechanism.",
      },
      {
        slug: "wiring",
        title: "Wiring your robot",
        description: "Connect power and devices, then label and check them.",
      },
      {
        slug: "first-program",
        title: "Your first program",
        description: "Try FTC Blocks and run code on your own robot.",
      },
      {
        slug: "autonomous-and-driving",
        title: "Autonomous and driving",
        description: "Test a short routine and practise with your drive team.",
      },
    ],
  },
  {
    title: "Design your own parts",
    description: "Learn CAD in Onshape and turn a design into a usable part.",
    lessons: [
      {
        slug: "cad-first-part",
        title: "Your first CAD part",
        description: "Sketch, dimension, extrude, and cut a mounting plate.",
      },
      {
        slug: "cad-assemblies",
        title: "CAD assemblies",
        description: "Fit parts together and leave room for the whole robot.",
      },
      {
        slug: "making-parts",
        title: "Making parts",
        description: "Measure, export, manufacture, and check the fit.",
      },
    ],
  },
  {
    title: "Prepare for competition",
    description:
      "Keep records, share your work, and arrive ready for your first event.",
    lessons: [
      {
        slug: "notebook-and-portfolio",
        title: "Your notebook and portfolio",
        description: "Record decisions and explain your work to judges.",
      },
      {
        slug: "outreach-and-funding",
        title: "Outreach and funding",
        description: "Help your community and ask for practical support.",
      },
      {
        slug: "first-event",
        title: "Your first event",
        description: "Inspection, interviews, matches, and what to pack.",
      },
      {
        slug: "season-plan",
        title: "Your season plan",
        description: "Plan the first six meetings and the rest of the season.",
      },
    ],
  },
];

export const starterLessons = starterPhases.flatMap((phase) => phase.lessons);
export const starterBase = "/docs/starter-guide";
