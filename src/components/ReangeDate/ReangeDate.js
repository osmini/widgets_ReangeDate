import React, { useState, useEffect } from 'react';
import moment from 'moment'; // библиотека для форматирование даты и дальнейшего сравнения

import DatePicker from '../../utils/DatePicker';

function ReangeDate () {

  const [popapDateLeft, setPopapDateLeft] = useState(false); // состояние активности левого инпута
  const [popapDateRight, setPopapDateRight] = useState(false); // состояние активности правого инпута
  const [monthToday, setMonthToday] = useState(0); // изменение левого месяца календаря
  const [monthNext, setMonthNext] = useState(0); // изменение правого месяца календаря
  const [monthDayLeft, setMonthDayLeft] = useState([]); // дни левого календаря
  const [monthDayRight, setMonthDayRight] = useState([]); // дни правого календаря
  const [startDate, setStartDate] = useState(null); // начальная дата
  const [endDate, setEndDate] = useState(new Date().toLocaleDateString()); // конечная дата
  const [dateLeft, setDateLeft] = useState(null); // выбранная левая дата
  const [dateRight, setDateRight] = useState(new Date().toLocaleDateString()); // выбранная правая дата
  const [cursorDate, setCursorDate] = useState(null); // дата на которой курсор
  const [monthLeft, setMonthLeft] = useState(null); // месяц левого календаря
  const [monthRight, setMonthRight] = useState(null); // месяц правого календаря
  const [yearLeft, setYearLeft] = useState(new Date().getFullYear()); // год левого календаря
  const [yearRight, setYearRight] = useState(new Date().getFullYear()); // год правого календаря
  const [openPopapLeftMounth, setOpenPopapLeftMounth] = useState(false); // открыть окно выбора месяца левого календаря
  const [openPopapRightMounth, setOpenPopapRightMounth] = useState(false); // открыть окно выбора месяца правого календаря
  const [openPopapLeftYear, setOpenPopapLeftYear] = useState(false); // открыть окно выбора года левого календаря
  const [openPopapRightYear, setOpenPopapRightYear] = useState(false); // открыть окно выбора года правого календаря
  const mounth = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ]

 // левое поле ввода даты
  useEffect(() => {
    if (popapDateLeft){

      setDateLeft(startDate);
      const isValid = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/.test(startDate);

      if (isValid) {

        const start = moment(startDate, 'DD.MM.YYYY').toDate();
        const end = moment(endDate, 'DD.MM.YYYY').toDate(); 

        if (start > end) {
          setDateLeft(endDate);
          setDateRight(startDate);
        } else {
          setDateLeft(startDate);
          setDateRight(endDate);

          setPopapDateLeft(false);
          setPopapDateRight(true);
        }
      }
    }
  }, [startDate, endDate]);

  // правое поле ввода даты
  useEffect(() => {
    if (popapDateRight){

      setDateRight(endDate);
      const isValid = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/.test(endDate);

      if (isValid) {
        const start = moment(startDate, 'DD.MM.YYYY').toDate();
        const end = moment(endDate, 'DD.MM.YYYY').toDate(); 
        
        if (end < start) {
          setDateRight(startDate);
          setDateLeft(endDate);
        } else {
          setDateRight(endDate);
          setDateLeft(startDate);

          setPopapDateLeft(true);
          setPopapDateRight(false);
        }
      }
    }
  }, [startDate, endDate]);

  // на месяц назад левого календаря
  function hundlerMonthTodayBack(){
    setMonthToday(monthToday - 1);
  }

  // на месяц вперед для левого календаря
  function hundlerMonthmonthTodayForward(){
    setMonthToday(monthToday + 1);
  }

  // на месяц назад для правого календаря
  function hundlerMonthNextBack(){
    setMonthNext(monthNext - 1);
  }

  // на месяц вперед для правого календаря
  function hundlerMonthmonthNextForward(){
    setMonthNext(monthNext + 1);
  }

  // левый календарь
  useEffect(() => {
    setMonthDayLeft(DatePicker.monthDayLeft(monthToday, monthLeft, yearLeft));
  },[monthToday, monthLeft, yearLeft]);

  // правый календарь
  useEffect(() => {
    setMonthDayRight(DatePicker.monthDayRight(monthNext, monthRight, yearRight));
  },[monthNext, monthRight, yearRight]);

  // получить дату
  function hundlerDate(day){
    if (popapDateLeft){
    setStartDate(day.toLocaleDateString());
    } else {
      setEndDate(day.toLocaleDateString());
    }
    setCursorDate(null);
  }

  // покрасить промежуток дат от конечной до  начальной
  function highlightReangeDate(day, className){

    const isValid = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/.test(startDate);

    if (isValid){
      if ( moment(startDate, 'DD.MM.YYYY').toDate() > moment(endDate, 'DD.MM.YYYY').toDate()){
        setEndDate(startDate);
        setStartDate(endDate);
      }
    }

    if ( (moment(day, 'DD.MM.YYYY').toDate() > moment(startDate, 'DD.MM.YYYY').toDate()) && (moment(day, 'DD.MM.YYYY').toDate() < moment(endDate, 'DD.MM.YYYY').toDate())){
      className += ' today-range';
    }

    return className;
  }

  // получить дни месяца по наведению курсора
  function hundlerCursorDate(day) {
    setCursorDate(day);
  }

  // закрасить дни месяца по наведению курсора  
  function highlightReangeDateCursor(day, className){
    if ( popapDateRight && cursorDate ){
      if (moment(day, 'DD.MM.YYYY').toDate() > moment(startDate, 'DD.MM.YYYY').toDate() && moment(day, 'DD.MM.YYYY').toDate() < moment(cursorDate, 'DD.MM.YYYY').toDate()){
        className += ' today-range';
      }
    }
    if ( popapDateLeft && cursorDate ){
      if (moment(day, 'DD.MM.YYYY').toDate() < moment(endDate, 'DD.MM.YYYY').toDate() && moment(day, 'DD.MM.YYYY').toDate() > moment(cursorDate, 'DD.MM.YYYY').toDate()){
        className += ' today-range';
      }
    }
    return className;
  }

  // сбросить дату курсора при выходе мыши из окна календаря
  function hundlerClearCursor() {
    setCursorDate(null);
  }

  // закрытие окна календаря когда убрали курсор 
  function hundlerCloseСalendar() {
    if(!popapDateLeft || !popapDateRight){
      setPopapDateLeft(false);
      setPopapDateRight(false);
    }
  }

  // ввод начальной даты в ручном режиме (левое окно)
  function hundlerInputStartDate(e) {
    setStartDate(e.target.value);
  }

  // ввод конечной даты в ручном режиме (правое окно)
  function hundlerInputEndDate(e) {
    setEndDate(e.target.value);
  }

  // открытие попап выбора левого месяца
  function hundlerOpenPopapMounthLeft() {
    setOpenPopapLeftMounth(true);
    setOpenPopapLeftYear(false);
  }

  // открытие попап выбора правого месяца
  function hundlerOpenPopapMounthRight() {
    setOpenPopapRightMounth(true);
    setOpenPopapRightYear(false);
  }

  // открытие попап выбора левого года
  function hundlerOpenPopapYearLeft() {
    setOpenPopapLeftYear(true);
    setOpenPopapLeftMounth(false);
    setMonthToday(null);
  }

  // открытие попап выбора правого года
  function hundlerOpenPopapYearRight() {
    setOpenPopapRightYear(true);
    setOpenPopapRightMounth(false);
    setMonthNext(null);
  }

  // установить месяц для выбора даты левого календаря
  function hundlerSetMounthLeft(index){
    setMonthLeft(index);
    setMonthToday(0);
    setOpenPopapLeftMounth(false);
  }

  // установить месяц для выбора даты правого календаря
  function hundlerSetMounthRight(index){
    setMonthRight(index);
    setMonthNext(0);
    setOpenPopapRightMounth(false);
  }

  // установить год для выбора даты левого календаря
  function hundlerSetYearsLeft(years){
    setYearLeft(years);
    setOpenPopapLeftYear(false);
  }

  // установить год для выбора даты правого календаря
  function hundlerSetYearsRight(years){
    setYearRight(years);
    setOpenPopapRightYear(false);
  }

  // получить месяц левого календаря
  function getMounthLeft(){
    return DatePicker.monthLeft(monthToday, monthLeft, yearLeft, openPopapLeftYear).split(' ')[0];
  }

  // получить год левого календаря
  function getYearLeft(){
    return (DatePicker.monthLeft(monthToday, monthLeft, yearLeft).split(' ')[1])+' г.';
  }

  // получить месяц правого календаря
  function getMounthRight(){
    return DatePicker.monthRight(monthNext, monthRight, yearRight, openPopapRightYear).split(' ')[0];
  }

  // получить год правого календаря
  function getYearRight(){
    return (DatePicker.monthRight(monthNext, monthRight, yearRight).split(' ')[1])+' г.';
  }
  
  return (

    <section className="ReangeDate">

      <form className="ReangeDate-form">
        
        <input 
          className={!popapDateLeft ? ("ReangeDate-form__input") : ("ReangeDate-form__input input-active")}
          type='text' 
          placeholder='с:' 
          onFocus={() => {
            setPopapDateRight(false);
            setPopapDateLeft(true);
            setOpenPopapLeftMounth(false);
            setOpenPopapLeftYear(false);
            setOpenPopapRightMounth(false);
            setOpenPopapRightYear(false);

          }}
          onClick={() => {
            setStartDate(null);
            setDateLeft('');
            setPopapDateRight(false);
            setPopapDateLeft(true);
          }}
          onChange={(e) => hundlerInputStartDate(e)}
          value={dateLeft}
        /> 

        <span className="ReangeDate-form__delimiter">&#8594;</span>
        <input 
          className={!popapDateRight ? ("ReangeDate-form__input") : ("ReangeDate-form__input input-active")}
          type='text' 
          placeholder='по:' 
          onFocus={() => {
            setPopapDateRight(true);
            setPopapDateLeft(false);
            setOpenPopapLeftMounth(false);
            setOpenPopapLeftYear(false);
            setOpenPopapRightMounth(false);
            setOpenPopapRightYear(false);
          }}
          onClick={() => {
            setEndDate(null);
            setDateRight('');
            setPopapDateRight(true);
            setPopapDateLeft(false);
          }}
          onChange={(e) => hundlerInputEndDate(e)}
          value={dateRight}
        />
      </form>

      {(popapDateLeft || popapDateRight) && (  
        <div className="ReangeDate-popap popap-active" onMouseLeave = {hundlerCloseСalendar}>

          <span className={ popapDateLeft ? "ReangeDate-popap__cursor" : "ReangeDate-popap__cursor cursor-rigth"}></span>

          <div className="ReangeDate-popap__date" onMouseOut = {hundlerClearCursor}>

            <div className="ReangeDate-popap__date-header">
              <div className={openPopapLeftMounth ? ("ReangeDate-popap__date-header-button inactiv") : ("ReangeDate-popap__date-header-button")} onClick = {hundlerMonthTodayBack}>&#9668;</div>
              <div className="ReangeDate-popap__title-wripper">
                <p className="ReangeDate-popap__date-header-title" onClick = {hundlerOpenPopapMounthLeft}>{getMounthLeft()}</p>
                <p className="ReangeDate-popap__date-header-title" onClick = {hundlerOpenPopapYearLeft}>{getYearLeft()}</p>
              </div>
              <div className={openPopapLeftMounth ? ("ReangeDate-popap__date-header-button inactiv") : ("ReangeDate-popap__date-header-button")} onClick = {hundlerMonthmonthTodayForward}>&#9658;</div>
            </div>

            <ul className={openPopapLeftMounth || openPopapLeftYear ? "ReangeDate-popap__date-name inactiv" : "ReangeDate-popap__date-name"}>
              <li className="ReangeDate-popap__date-name-item">Пн</li>
              <li className="ReangeDate-popap__date-name-item">Вт</li>
              <li className="ReangeDate-popap__date-name-item">Ср</li>
              <li className="ReangeDate-popap__date-name-item">Чт</li>
              <li className="ReangeDate-popap__date-name-item">Пт</li>
              <li className="ReangeDate-popap__date-name-item">Сб</li>
              <li className="ReangeDate-popap__date-name-item">Вс</li>
            </ul>

            <ul className={openPopapLeftMounth || openPopapLeftYear ? "mountsYears" : "ReangeDate-popap__date-calendar"}>
              {openPopapLeftMounth || openPopapLeftYear ? (
                openPopapLeftMounth ? (
                  mounth.map((mounth, index) => {
                    let className = 'mountsYears__item';

                    // левый календарь выбора месяца
                    if (monthLeft >= 0 && monthLeft === index) {
                      className += ' today';
                    }
                    if (monthLeft === null && new Date().getMonth() - 1 === index) {
                      className += ' today';
                    }

                    return (
                      <div className={className} onClick={() => hundlerSetMounthLeft(index)} key={index}>
                        {mounth}
                      </div>
                    );
                  })
                ) : (
                  DatePicker.getYears(monthToday).map((year, index) => {
                    let className = 'mountsYears__item';

                    // левый календарь выбора года
                    if (hundlerSetYearsLeft) {
                      if (yearLeft === year) {
                        className += ' today';
                      }

                      return (
                        <div className={className} onClick={() => hundlerSetYearsLeft(year)} key={index}>
                          {year}
                        </div>
                      );
                    }
                  })
                )
              ) : (
                monthDayLeft.map((day, index) => {
                  let className = 'ReangeDate-popap__date-calendar-item';

                  // выделить выбранную дату
                  if (day && (day.toLocaleDateString() === dateLeft || day.toLocaleDateString() === dateRight)) {
                    className += ' today';
                  }

                  className = highlightReangeDateCursor(day, className);
                  className = highlightReangeDate(day, className);

                  return (
                    <div key={index} className={day ? className : ("")} onClick={() => hundlerDate(day)} onMouseEnter={() => hundlerCursorDate(day)}>
                      {day ? day.getDate() : ""}
                    </div>
                  );
                })
              )}
            </ul>

          </div>

          <div className="ReangeDate-popap__date" onMouseOut = {hundlerClearCursor}>

            <div className="ReangeDate-popap__date-header">
              <div className={openPopapRightMounth ? ("ReangeDate-popap__date-header-button inactiv") : ("ReangeDate-popap__date-header-button")} onClick={hundlerMonthNextBack}>&#9668;</div>
              <div className="ReangeDate-popap__title-wripper">
                <p className="ReangeDate-popap__date-header-title" onClick = {hundlerOpenPopapMounthRight}>{getMounthRight()}</p>
                <p className="ReangeDate-popap__date-header-title" onClick = {hundlerOpenPopapYearRight}>{getYearRight()}</p>
              </div>
              <div className={openPopapRightMounth ? ("ReangeDate-popap__date-header-button inactiv") : ("ReangeDate-popap__date-header-button")} onClick={hundlerMonthmonthNextForward}>&#9658;</div>
            </div>

            <ul className={openPopapRightMounth || openPopapRightYear ? "ReangeDate-popap__date-name inactiv" : "ReangeDate-popap__date-name"}>
              <li className="ReangeDate-popap__date-name-item">Пн</li>
              <li className="ReangeDate-popap__date-name-item">Вт</li>
              <li className="ReangeDate-popap__date-name-item">Ср</li>
              <li className="ReangeDate-popap__date-name-item">Чт</li>
              <li className="ReangeDate-popap__date-name-item">Пт</li>
              <li className="ReangeDate-popap__date-name-item">Сб</li>
              <li className="ReangeDate-popap__date-name-item">Вс</li>
            </ul>

            <ul className={openPopapRightMounth || openPopapRightYear ? "mountsYears" : "ReangeDate-popap__date-calendar"}>
              {openPopapRightMounth || openPopapRightYear ? (
                openPopapRightMounth ? (
                  mounth.map((mounth, index) => {
                    let className = 'mountsYears__item';

                    // правый календарь выбора месяца
                    if ((monthRight != null ) && monthRight === index){
                      className += ' today';
                    }
                    if ((monthRight === null) && (DatePicker.getMonth()) === index) {
                      className += ' today';
                    }
          
                    return (
                      <div className={className} onClick={() => hundlerSetMounthRight(index)}>
                        {mounth}
                      </div>
                    );
                  })
                ) : (
                  DatePicker.getYears(monthNext).map((year, index) => {
                    let className = 'mountsYears__item';

                    // праввый календарь выбора года
                    if(hundlerSetYearsRight){

                      if (yearRight === year){
                        className += ' today';
                      } 
                      
                      return (
                        <div className={className} onClick={() => hundlerSetYearsRight(year)} key={index}>
                          {year}
                        </div>
                      );
                    }
                  })
                )
              ) : (
                monthDayRight.map((day, index) => {

                  let className = 'ReangeDate-popap__date-calendar-item';
  
                  // выделить текущую дату
                  if (day && (day.toLocaleDateString()  === endDate)){
                    className += ' today';
                  }
  
                  // выделить выбранную  дату
                  if (day && (day.toLocaleDateString() === dateLeft || day.toLocaleDateString() === dateRight)){
                    className += ' today';
                  }
                  
                  className = highlightReangeDateCursor(day, className)
                  className = highlightReangeDate(day, className);
  
                  return (
                  <div key={index+100} className={day ? className : ("") } onClick={() => hundlerDate(day)} onMouseEnter={() => hundlerCursorDate(day)}>
                    {day ? day.getDate() : ""}
                  </div>)
                })
              )}
            </ul>

          </div>

        </div>
        )}

    </section>

  );
}
  
export default ReangeDate;
  