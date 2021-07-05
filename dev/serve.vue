<template>
  <div id="app">
    <pdf-editor 
      :template="template"
      :buttons="buttons"
      :datasource="datasource"
      @change="change"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import PdfEditor from '@/App.vue';

var ls = require('local-storage');

let buttons = {
  'user.surname': 'Фамилия',
  'user.name': 'Имя',
  'user.patronymic': 'Отчество',
  'user.sex': 'Пол',
  'user.birthdate': 'Дата рождения',
  'user.birthplace': 'Место рождения',
  'passport.serial': 'Серия и номер паспорта',
  'passport.issued': 'кем выдан паспорт',
  'passport.date': 'когда выдан паспорт',
  'address_register': 'Адрес регистрации',
  'education.type': 'Образование',
  'education.organization': 'Наименование образовательной организации',
  'education.specialty': 'Специальность / направление подготовки',
  'education.year_end': 'Год окончания обучения',
  'workplace': 'Место работы',
  'position': 'Занимаемая должность',
  'address_live': 'Адрес места жительства',
  'phone': 'Контактный телефон',
  'email': 'e-mail',
  'study.number': 'Дело № тест',
  'study.register_source': 'Регистрация прохождения обучения',
  'study.programname': 'Наименование образовательной программы',
  'study.volume': 'объём',
  'study.date_start': 'Начало обучения',
  'study.date_end': 'окончание обучения',
  'study.enrollment.date': 'Дата приказа о зачислении',
  'study.enrollment.document': 'Номер приказа о зачислении',
  'study.expelled.date': 'Дата приказа об отчислении',
  'study.expelled.document': 'Номер приказа об отчислении',
  'study.marks': 'Отметки',
  'study.given.document': 'Выдан документ',
  'study.given.date': 'Когда выдан документ'
}

let datasource = {
  user: {
    name: "Игорь",
    surname: "Петров",
    patronymic: "Петрович",
    sex: "Мужской",
    birthdate: "12.05.1984",
    birthplace: "Омск",
  },
  passport: {
    serial: "1056 445544",
    issued: "ОВД г. Омска",
    date: "23.05.2004",
  },
  address_register: "улица Ленина 33",
  education: {
    type: "Среднее",
    organization: "Институт цифрового ленинизма",
    specialty: "Главный специалист",
    year_end: "2000",
  },
  workplace: "ООО Арктика",
  position: "Монтажёр осветительного оборудования",
  address_live: "улица Ленина 36",
  phone: "+79007768543",
  email: "asdf@nuki.com",
  study: {
    register_source: "Группа",
    number: "1444",
    programname: "Гибкое использование воздушного пространства (ОВД.3.1.300)",
    volume: "40 часов",
    date_start: "01.05.2019",
    date_end: "01.08.2020",
    marks: "Хороший ученик",
    given: {
      document: "Диплом",
      date: "12.04.2021",
    },
    enrollment: {
      date: "01.05.2019",
      document: "1234",
    },
    expelled: {
      date: "01.08.2019",
      document: "613",
    }
  },

  tables: {
    discipline: {
      columns: 4,
      rows_count: 4,
      headers: [
        "п/п",
        "Наименование дисциплин (модулей)",
        "Количество часов",
        "Оценка",
      ],
      rows: [
        [ 
          "1",
          "Концепция гибкого использования воздушного пространства",
          "18",
          "Отлично",
        ],
        [ 
          "2",
          "Уровни организации гибкого использования воздушного пространства",
          "15",
          "Хорошо",
        ],
        [ 
          "3",
          "Внедрение гибкого использования воздушного пространства",
          "18",
          "Отлично",
        ],
        [ 
          "4",
          "Итоговая аттестация",
          "2",
          "Отлично",
        ],
      ]
    }
  }
}


export default defineComponent({
  name: 'ServeDev',
  components: {
    PdfEditor
  },
  data() {
    return {
      buttons,
      datasource,
      template: ls('savedcontent') || '',
    }
  },
  methods: {
    change(html) {
      ls('savedcontent', html);
    }
  }
});
</script>