// класс для работы с датой
class DatePicker {

  constructor(){
    this._currentDate = new Date();
    this.years = [];
  }

  // дни левого календаря
  monthDayLeft(monthToday, monthLeft, yearLeft) {

    const currentDate = new Date(); // Создаем объект Date для текущей даты
    let month;
    let year;

    // если выбрали месяц то выставить месяц
    if(monthLeft != null ){
      currentDate.setMonth(monthLeft); 
      month = (currentDate.getMonth() + monthToday); // Получаем текущий месяц (от 0 до 11)
    } else {
      month = (currentDate.getMonth() + monthToday) -1; // Получаем текущий месяц (от 0 до 11)
    }

    // если выбрали год то выставить год
    if(yearLeft != null ){
      currentDate.setFullYear(yearLeft); 
      year = (currentDate.getFullYear()); // Получаем выбранный год
    } else {
      year = (currentDate.getFullYear()); // Получаем текущий год
    }

    const firstDayOfMonth = new Date(year, month, 1);    // Определяем первый день текущего месяца
    const lastDayOfMonth = new Date(year, month + 1, 0);  // Определяем последний день текущего месяца
    let firstDayOfWeek = firstDayOfMonth.getDay(); // вычисляем с какого дня недели начинается месяц

    const daysOfMonth = []; // Создаем переменную для хранения всех дней месяца

    // когда день недели воскресенье, то 
    // firstDayOfWeek = 0, а нам нужно 7
    if (firstDayOfWeek === 0){
      firstDayOfWeek = 7;
    }

    // заполняем пустотой ненужные ячейки календаря
    for (let i = 0; i < firstDayOfWeek-1; i++) {
      daysOfMonth.push(null);
    }

    // заполняем числами ячейки календаря
    for (let day = firstDayOfMonth.getDate(); day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(year, month, day);
      daysOfMonth.push(date);
    }
    
    return daysOfMonth;
  }

  // дни правого календаря
  // monthToday переменная которая отвечает сколько месяцев вычитать из тякущей даты
  monthDayRight(monthNext, monthRight, yearRight) {
    
    const currentDate = new Date(); // Создаем объект Date для текущей даты
    let month;
    let year;

    // если выбрали месяц то выставить месяц
    if(monthRight != null ){
      currentDate.setMonth(monthRight); 
      month = (currentDate.getMonth() + monthNext); // Получаем текущий месяц (от 0 до 11)
    } else {
      month = (currentDate.getMonth() + monthNext); // Получаем текущий месяц (от 0 до 11)
    }

    // если выбрали год то выставить год
    if(yearRight != null ){
      currentDate.setFullYear(yearRight); 
      year = (currentDate.getFullYear()); // Получаем выбранный год
    } else {
      year = (currentDate.getFullYear()); // Получаем текущий год
    }

    const firstDayOfMonth = new Date(year, month, 1);    // Определяем первый день текущего месяца
    const lastDayOfMonth = new Date(year, month + 1, 0);  // Определяем последний день текущего месяца
    let firstDayOfWeek = firstDayOfMonth.getDay(); // вычисляем с какого дня недели начинается месяц
    const daysOfMonth = []; // Создаем переменную для хранения всех дней месяца

    // когда день недели воскресенье, то 
    // firstDayOfWeek = 0, а нам нужно 7
    if (firstDayOfWeek === 0){
      firstDayOfWeek = 7;
    }

    // заполняем пустотой ненужные ячейки календаря
    for (let i = 0; i < firstDayOfWeek-1; i++) {
      daysOfMonth.push(null);
    }

    // заполняем числами ячейки календаря
    for (let day = firstDayOfMonth.getDate(); day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(year, month, day);
      daysOfMonth.push(date);
    }

    return daysOfMonth;
  }

  // Вывести числом текущей месяц
  getMonth() {
    return this._currentDate.getMonth();
  }

  // вывести числом текущей год
  getYear(){
    return this._currentDate.getFullYear();
  }
  
  // вывести последние 12 лет
  getYears(chehgYear){

    let year = this._currentDate.getFullYear();

    if(chehgYear){
      year = year + (chehgYear * 12);
    };

    for (var i = 0; i<12; i++){
      this.years[i] = year - i;
    };

    return this.years.reverse();
  }

  // Вывести месяц левого календаря
  monthLeft(monthToday, monthLeft, yearLeft, openPopapLeftYear) {
  
    let startDate = new Date(this._currentDate); // Создаем копию текущей даты

    // если установили месяц сами
    if (!openPopapLeftYear){
      if(monthLeft != null){
        startDate.setMonth((monthLeft) + monthToday); 
      } else {
        startDate.setMonth(((startDate.getMonth() + monthToday)-1)); 
      }
    }

    // если установили год сами
    if(yearLeft != null){
      startDate.setFullYear(yearLeft); 
    }

    return startDate.toLocaleString('ru-RU', { month: 'long', year: 'numeric', localeMatcher: 'best fit' })
      .replace(/^[\p{Ll}]/u, (c) => c.toUpperCase());
  }

  // Вывести текущий месяц
  monthRight(monthNext, monthRight, yearRight, openPopapRightYear) {

    let endDate = new Date(this._currentDate); // Создаем копию текущей даты

    // если установили месяц сами
    if (!openPopapRightYear){
      if(monthRight != null){
        endDate.setMonth((monthRight) + monthNext); 
      } else {
        endDate.setMonth(((endDate.getMonth() + monthNext))); 
      }
    }

    // если установили год сами
    if(yearRight != null){
      endDate.setFullYear(yearRight); 
    }

    return endDate.toLocaleString('ru-RU', { month: 'long', year: 'numeric', localeMatcher: 'best fit' })
      .replace(/^[\p{Ll}]/u, (c) => c.toUpperCase());
  }

}

const datePicker = new DatePicker();

export default datePicker;
