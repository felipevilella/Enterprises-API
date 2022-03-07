interface ICreateContributorDTO {
  user_id_action?: string;
  user_id: string;
  company_id: string;
  type_office_id: string;
}

interface IUnlikeContibutorDTO {
  user_id_action?: string;
  user_id: string;
  company_id: string;
  type_office_id: string;
}

interface IListContributorDTO {
  user_id_action?: string;
  company_id: string;
}

export { ICreateContributorDTO, IUnlikeContibutorDTO, IListContributorDTO };
