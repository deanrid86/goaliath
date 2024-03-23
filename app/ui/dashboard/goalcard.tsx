import {fetchAllLatestGoalsAndHighSteps} from '@/app/lib/data';

export default async function DashGoalCard() {
    const fetchgoals = await fetchAllLatestGoalsAndHighSteps ();

    return (
      <div className="w-full border border-black h-[50vh]"> {/* Parent Container */}
        <div className="p-2 m-2 rounded-xl border border-black h-full"> {/* Card Border Container */}
          <div className="h-5/6 w-full border border-black"> {/* Container for top, left and right aspects of card (Contains Bulk of Info) */}
            <div className="h-1/6 w-full flex border border-black"> {/* Container for top aspects of card */}
              <div className="w-1/6 border border-black flex-none"> {/* Container for left of top card */}
                <h4 className="text-18">Goal Summary</h4>
                <p>Your Latest Goals</p>
              </div>
              <div className="w-5/6 border border-black flex-auto"> {/* Container for right of top card */}
                <p>Top Right</p>
              </div>
            </div>
            <div className="h-5/6 w-1/3border border-black float-left"> {/* Container for left aspects of card */}
              <div className="h-1/4 border border-black"> {/* Container for the Goal title */}
                <p></p>
              </div>
              <div className="h-1/4 border border-black"> {/* Container for the Goal Duration */}
                <p>Duration:</p>
              </div>
              <div className="h-1/4 border border-black"> {/* Container for the Goal Free Hours */}
                <p>Free Hours:</p>
              </div>
              <div className="h-1/4 border border-black"> {/* Container for cycle through Goal Button */}
                <p>Cycle Goals:</p>
              </div>
            </div>
            <div className="h-5/6 w-2/3 border border-black float-right"> {/* Container for right aspects of card */}
              <p>Right Side Card</p>
            </div>
          </div>
          <div className="h-1/6 w-full flex border border-black"> {/* Container for bottom aspects of card */}
            <div className="w-1/4 border border-black flex-none"> {/* Container for 1st section of bottom */}
              <p>box 1</p>
            </div>
            <div className="w-1/4 border border-black flex-none"> {/* Container for 2nd section of bottom */}
              <p>box 2</p>
            </div>
            <div className="w-1/4 border border-black flex-none"> {/* Container for 3rd section of bottom */}
              <p>box 3</p>
            </div>
            <div className="w-1/4 border border-black flex-none"> {/* Container for 4th section of bottom */}
              <p>box 4</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  