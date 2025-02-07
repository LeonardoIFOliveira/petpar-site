import moment from 'moment';

export class User {
  id!: number;
  name!: string;
  email!: string;
  birthDate!: Date;
  password!: string;
  cpf!: string;
  phoneNumber!: string;
  gender!: string;
  active = true;

  static toJson(user: User): any {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      birthDate: moment(user.date).format('DD/MM/YYYY'),
      cpf: user.cpf,
      phoneNumber: user.phoneNumber,
      cpf: user.cpf,
      gender: user.gender,
      active: user.active
    }
  }
}

export class Institution {
  id!: number;
  name!: string;
  description!: string;
  email!: string;
  password!: string;
  cpfOrCnpj!: string;
  phoneNumber!: user.phoneNumber;
  active = true;

  static toJson(user: User): any {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      description: user.description,
      cpfOrCnpj: user.cpfOrCnpj,
      phoneNumber: user.phoneNumber,
      active: user.active
    }
  }
}


export class Animal {
  id!: number;
  name!: string;
  description!: string;
  gender!: string;
  birthDate!: Date;
  type!: string;
  statusAdoption!: string;
  user!: User;
  institution!: Institution;

  constructor(user_id: number){
    this.user = new User();
    this.user.id = user_id;
  }

  constructor(institution_id: number){
    this.user = new User();
    this.user.id = institution_id;
  }

  static toJson(user: User): any {
    return {
      id: user.id,
      name: user.name,
      description: user.description,
      gender: user.gender,
      birthDate: user.birthDate,
      type: user.type,
      statusAdoption: user.statusAdoption,
      user: activity.user,
      institution: activity.institution
    }
  }

}

export class Donation {
  id!: number;
  type!: 'CAMINHADA';
  date!: Date;
  distance!: number;
  duration!: number;
  user!: User;

  constructor(user_id: number){
    this.user = new User();
    this.user.id = user_id;
  }

  static toJson(activity: Activity): any {
    return {
      id: activity.id,
      type: activity.type,
      date: moment(activity.date).format('DD/MM/YYYY'),
      distance: activity.distance,
      duration: activity.duration,
      user: activity.user
    }
  }
}
