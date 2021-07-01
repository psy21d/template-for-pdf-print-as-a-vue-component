# template-for-pdf-print-as-a-vue-component

using:
```
<template>
  <div id="app">
    <pdf-editor :buttons="buttons" />
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import PdfEditor from '@/App.vue';

let buttons = {
  'user.surname': 'Фамилия',
  'user.name': 'Имя',
  'user.patronymic': 'Отчество',
  'sex': 'Пол',
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

export default defineComponent({
  name: 'ServeDev',
  components: {
    PdfEditor
  },
  data() {
    return {
      buttons
    }
  }
});
</script>
```

! port for pdfserver now is 4500
! fonts serving from pdfserver
