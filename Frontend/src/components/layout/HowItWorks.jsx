export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Create Your Quiz",
      description:
        "Build engaging quizzes right from your browser. Add questions, images, timers, polls, puzzles and more with a simple editor designed to help you move fast. No downloads needed."
    },
    {
      id: 2,
      title: "Share with Your Audience",
      description:
        "Send your quiz link to students, friends or participants. Anyone can join instantly through their browser — on mobile, tablet or computer."
    },
    {
      id: 3,
      title: "Host Live or Self Paced",
      description:
        "Run your quiz as a live session and watch players compete in real time, or let participants complete it at their own pace. You choose the mode."
    },
        {
      id: 4,
      title: "Track Results and Insights",
      description:
        "View responses, accuracy, completion rate and performance insights as soon as players finish. Use your results to improve your next quiz or power your lessons and activities."
    },
    
  ];

  return (
    <section className="w-full py-28 font-[Charis]" id="HowItWorks">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center">How Does QuizMe! Work?</h2>
        <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto text-xl font-bold">
        Create your own quizzes, challenge friends, and learn something new every day—all on QuizMe!, right from your browser.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 mt-16">
          {steps.map((step, index) => (
          
  <div
    key={step.id}
    className={
      `text-center flex flex-col items-center p-8 rounded-2xl
      font-Baloo 
      shadow-xl hover:shadow-2xl 
      ${index % 2 === 0 ? "bg-pink-50" : "bg-blue-50"}`
    }
  >
              <div 
              className="w-16 h-16 flex items-center justify-center text-2xl bg-blue-100 rounded-full mb-6">
                {step.id}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
