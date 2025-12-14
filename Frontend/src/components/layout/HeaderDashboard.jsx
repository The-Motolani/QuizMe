import { getGreeting } from "../../utils/greeting";
import QuizMeLogo from "../../assets/images/QuizMeLogo";
import Doughnut from '../../assets/images/doughnut.jpg';
import '../../App.css';
export default function HeaderDashboard({name}) {
  const greeting = getGreeting();
    return (
        <header className="items-center mx-20 mt-4 mb-3">
            <div className="flex justify-between mb-4 items-center">
                <QuizMeLogo />
               <h2 className="Baloo">
                    {greeting}, {name}
            </h2>
            <div className="my-6 ml-4 relative">
                      <img
                        src={Doughnut}
                        alt="user image"
                        className="rounded-full h-10 w-10 border-2 border-pink-100 shadow-xl hover:cursor-pointer hover:shadow-3xl"
                      />

                </div>
            </div>
            <hr className="border-blue-100 mx-15 mb-4" />
        </header>
    );
}
