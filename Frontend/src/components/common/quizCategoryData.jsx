import { MdComputer, MdMovie,
  MdChecklist,
  MdToggleOn,
  MdEditNote,
  MdCompareArrows,
  MdImage,
  MdAudiotrack,
  MdScore,
  MdCampaign,
  MdShoppingCart,
  MdPoll,
  MdTouchApp,
  MdLink,
  MdDragIndicator
} from "react-icons/md";
import { FaBrain, FaGraduationCap, FaUserCircle } from "react-icons/fa";

export const quizCategoryData = [
  {
    group: "By Topic",
    items: [
      {
        title: "Technology",
        description: "Quizzes on software, gadgets, AI, programming, and emerging tech.",
        IconComponent: MdComputer,
        path: "/quiz/technology",
        subCategories: [
          { title: "Programming", path: "/quiz/technology/programming" },
          { title: "Artificial Intelligence", path: "/quiz/technology/ai" },
          { title: "Cybersecurity", path: "/quiz/technology/cybersecurity" },
          { title: "Gadgets & Hardware", path: "/quiz/technology/gadgets" }
        ]
      },
      {
        title: "Knowledge / Trivia",
        description: "General knowledge quizzes across history, science, and fun facts.",
        IconComponent: FaBrain,
        path: "/quiz/trivia",
        subCategories: [
          { title: "General Knowledge", path: "/quiz/trivia/general" },
          { title: "Science Facts", path: "/quiz/trivia/science" },
          { title: "History", path: "/quiz/trivia/history" },
          { title: "Fun Facts", path: "/quiz/trivia/fun-facts" }
        ]
      },
      {
        title: "Educational / Assessment",
        description: "Curriculum-based quizzes for learning and evaluation.",
        IconComponent: FaGraduationCap,
        path: "/quiz/education",
        subCategories: [
          { title: "Mathematics", path: "/quiz/education/mathematics" },
          { title: "English Language", path: "/quiz/education/english" },
          { title: "Biology", path: "/quiz/education/biology" },
          { title: "ICT", path: "/quiz/education/ict" }
        ]
      },
      {
        title: "Pop Culture",
        description: "Movies, music, celebrities, sports, and entertainment quizzes.",
        IconComponent: MdMovie,
        path: "/quiz/pop-culture",
        subCategories: [
          { title: "Movies", path: "/quiz/pop-culture/movies" },
          { title: "Music", path: "/quiz/pop-culture/music" },
          { title: "Celebrities", path: "/quiz/pop-culture/celebrities" },
          { title: "Sports", path: "/quiz/pop-culture/sports" }
        ]
      }
    ]
  },

  {
    group: "By Question Format",
    items: [
      {
        title: "Multiple Choice",
        description: "Select the correct answer from multiple options.",
        IconComponent: MdChecklist,
        path: "/quiz/mcq",
        subCategories: [
          { title: "Single Answer", path: "/quiz/mcq/single" },
          { title: "Multiple Answers", path: "/quiz/mcq/multiple" },
          { title: "Timed MCQs", path: "/quiz/mcq/timed" }
        ]
      },
      {
        title: "True / False",
        description: "Decide whether a statement is correct or incorrect.",
        IconComponent: MdToggleOn,
        path: "/quiz/true-false",
        subCategories: [
          { title: "Quick Rounds", path: "/quiz/true-false/quick" },
          { title: "Timed Rounds", path: "/quiz/true-false/timed" }
        ]
      },
      {
        title: "Fill in the Blanks",
        description: "Recall and type missing words or phrases.",
        IconComponent: MdEditNote,
        path: "/quiz/fill-blanks",
        subCategories: [
          { title: "Single Word", path: "/quiz/fill-blanks/single-word" },
          { title: "Sentence Completion", path: "/quiz/fill-blanks/sentences" }
        ]
      },
      {
        title: "Matching",
        description: "Pair related items from two different lists.",
        IconComponent: MdCompareArrows,
        path: "/quiz/matching",
        subCategories: [
          { title: "Terms & Definitions", path: "/quiz/matching/definitions" },
          { title: "Images & Labels", path: "/quiz/matching/images" }
        ]
      }
    ]
  },

  {
    group: "Media-Based",
    items: [
      {
        title: "Visual Rounds",
        description: "Identify images or answer questions using visual clues.",
        IconComponent: MdImage,
        path: "/quiz/visual",
        subCategories: [
          { title: "Picture Identification", path: "/quiz/visual/identify" },
          { title: "Spot the Difference", path: "/quiz/visual/difference" }
        ]
      },
      {
        title: "Audio Rounds",
        description: "Identify sounds, voices, or music snippets.",
        IconComponent: MdAudiotrack,
        path: "/quiz/audio",
        subCategories: [
          { title: "Music Guessing", path: "/quiz/audio/music" },
          { title: "Voice Recognition", path: "/quiz/audio/voice" }
        ]
      }
    ]
  },

  {
    group: "Purpose & Game Style",
    items: [
      {
        title: "Personality Quizzes",
        description: "Fun and insightful quizzes that reveal personality traits.",
        IconComponent: FaUserCircle,
        path: "/quiz/personality",
        subCategories: [
          { title: "Career Personality", path: "/quiz/personality/career" },
          { title: "Relationship Style", path: "/quiz/personality/relationships" }
        ]
      },
      {
        title: "Scored Assessments",
        description: "Knowledge-based quizzes with scores and feedback.",
        IconComponent: MdScore,
        path: "/quiz/scored",
        subCategories: [
          { title: "Practice Tests", path: "/quiz/scored/practice" },
          { title: "Exams & Mock Tests", path: "/quiz/scored/exams" }
        ]
      },
      {
        title: "Live Polls",
        description: "Real-time audience engagement during events or presentations.",
        IconComponent: MdPoll,
        path: "/quiz/live-polls",
        subCategories: [
          { title: "Event Polls", path: "/quiz/live-polls/events" },
          { title: "Classroom Polls", path: "/quiz/live-polls/classroom" }
        ]
      },
        { title: "Lead Generation", 
        description: "Engage users while capturing leads for businesses.", 
        IconComponent: MdCampaign, 
        path: "/quiz/lead-gen"
     },
        { title: "Product Recommendation", 
            description: "Help users find products or services that fit their needs.",
             IconComponent: MdShoppingCart, 
            path: "/quiz/recommendation" 
        },
        { title: "Interactive Format",
             description: "Timed, animated, and feedback-driven quiz experiences.", 
             IconComponent: MdTouchApp, 
             path: "/quiz/interactive" 
            }, 
            { title: "Common Bond", 
                description: "Find the hidden connection between related answers.", 
            IconComponent: MdLink, 
            path: "/quiz/common-bond" },
        {
        title: "Drag and Drop",
        description: "Sort or arrange items into the correct order.",
        IconComponent: MdDragIndicator,
        path: "/quiz/drag-drop",
        subCategories: [
          { title: "Ordering", path: "/quiz/drag-drop/ordering" },
          { title: "Categorization", path: "/quiz/drag-drop/categorization" }
        ]
      }
    ]
  }
];
