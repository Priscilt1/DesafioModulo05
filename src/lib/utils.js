module.exports = {
  age(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }

    return age;
  },

  date(timestamp) {
    const date = new Date (timestamp)  


    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate ()}`.slice(-2)

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`
    }
  },

  graduation(schooling) {
    const graduations = {
      "EM": "Ensino Médio Completo",
      "ES": "Ensino Superior Completo",
      "M": "Mestrado",
      "D": "Doutrado"
    }

    return graduations[schooling]
  },

  
  grade(schoolyear) {
    const grades = {
      "5": "5º Ano",
      "6": "6º Ano",
      "7": "7º Ano",
      "8": "8º Ano",
      "9": "9º Ano",
      "1": "1º Ano",
      "2": "2º Ano",
      "3": "3º Ano"
    }

    return grades[schoolyear]
  }

}
