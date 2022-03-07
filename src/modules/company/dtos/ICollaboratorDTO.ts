interface ICreateCollaboratorDTO {
  user_id_action?: string;
  user_id: string;
  company_id: string;
  type_office_id: string;
}

interface IUnlikeCollaboratorDTO {
  user_id_action?: string;
  user_id: string;
  company_id: string;
  type_office_id: string;
  active: boolean;
}

interface IListCollaboratorDTO {
  user_id_action?: string;
  company_id: string;
}

interface IFinbByUserCollaboratorDTO {
  user_id: string;
}

export {
  ICreateCollaboratorDTO,
  IUnlikeCollaboratorDTO,
  IListCollaboratorDTO,
  IFinbByUserCollaboratorDTO,
};
