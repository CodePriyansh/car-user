"use client";
import CarCards from "./CarCards";
function HomePageCards({cars, carNotFoundtext, onDelete}) {

  
  return (
    <>
      {cars?.length < 1  ? (
        <div className="text-center mt-[50%] sm:mt-[9%] lg:mt-[10%] text-[24px] text-greyy"> {carNotFoundtext}</div>
      ) : (
        <>
        <p className="text-para font-bold block mt-2 sm:text-[24px] font-rajdhani container_space ">{cars?.length} Cars</p>
        <div className="container_space  w-full grid md1:grid-cols-3 sm:grid-cols-2 grid-cols-1  sm:gap-6 gap-4 md:bg-f7f7f7 sm:pb-4 py-2">

          {cars?.map((car:any, index:number) => (
            <CarCards car={car} key={index} onDelete={onDelete}  />
          ))}
        </div>
        </>
        
      )}
    </>
  );
}

export default HomePageCards;
