import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
   
  new Date(evtA.date) > new Date(evtB.date) ? -1 : 0);
  
  useEffect(() => {
    const nextCard = setTimeout(
      // simplement j'ai modifié le slide pour demarrer de -1 = 3em  et dernier image, 0 = revenir au 1er image 
      () => setIndex(index < byDateDesc.length -1 ? index + 1 : 0),
    
      5000)
     
    return () => clearTimeout(nextCard); // deplacer timeout dans use effect error console
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
       
          <div
            key={event.title}>
            <div
               className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
            >

           
           
          
          
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>

            {/* Selecteur Slide */}

          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_,radioIdx) => (
                <input
                  key={`${event.title}`} // event.title permet de parcourir les titre des slides
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // "index" fait parcourir les selecteur, 'idx' le bloqué
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
        ))}
    </div>
  );
};

export default Slider;
