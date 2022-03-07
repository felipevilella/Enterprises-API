interface ICreateCompanyDTO {
  user_id_action?: string;
  email?: string;
  name: string;
  occupation_area: string;
  description: string;
  founded_in: string;
  name_director?: string;
}

interface IUpdateCompanyDTO {
  user_id_action?: string;
  email?: string;
  id: string;
  name?: string;
  occupation_area?: string;
  description?: string;
  founded_in?: string;
  name_director?: string;
  active?: boolean;
}

interface IDetailtCompany {
  user_id_action?: string;
  id: string;
}

interface IListCompanys {
  id: string;
}

interface ICompanyDTO {
  user_id_action?: string;
  email?: string;
  id?: string;
  name?: string;
  occupation_area?: string;
  description?: string;
  founded_in?: string;
  name_director?: string;
  active?: boolean;
}

export {
  ICreateCompanyDTO,
  ICompanyDTO,
  IUpdateCompanyDTO,
  IDetailtCompany,
  IListCompanys,
};
