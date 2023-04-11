export interface jobsListInitialStateType {
  assigned_to: number;
  company: number;
  created: string;
  created_by: number;
  description: string;
  due_date_index: number;
  expected_delivery_date: string;
  house_member: any[];
  id: number | string;
  image_url: string;
  images: any[];
  industry: number;
  is_active: boolean;
  is_blocked: boolean;
  is_house_member: boolean;
  is_trashed: boolean;
  job_due_date: string;
  job_type: string;
  jobtasks_job: any[];
  level: null;
  modified: string;
  price: null;
  related_jobs: null;
  sample_work_url: string;
  skills: any[];
  status: number;
  tags: string;
  template_name: null;
  title: string;
  user: number;
  workflow: number;
}

export interface jobsDetailsInitialStateType {
  id: number;
  images: any[];
  jobtasks_job: any[];
  level: {
    id: number;
    created: string;
    modified: string;
    is_trashed: false;
    level_name: string;
    slug: string;
    description: string;
    is_active: boolean;
  };
  skills: [
    {
      id: number;
      created: string;
      modified: string;
      is_trashed: boolean;
      skill_name: string;
      slug: string;
      is_active: boolean;
    }
  ];
  get_jobType_details: string;
  job_applied_status: string;
  workflow_name: string;
  company_name: string;
  industry_name: string;
  username: string;
  job_applied_id: string;
  is_edit: boolean;
  hired_users: [
    {
      user__username: string;
      user_id: number;
    }
  ];
  job_applied_modified: boolean;
  is_expire: boolean;
  flag: boolean;
  users_applied_status: [
    {
      user__username: string;
      user_id: number;
      status: number;
    }
  ];
  created: string;
  modified: string;
  is_trashed: boolean;
  title: string;
  description: string;
  job_type: string;
  expected_delivery_date: string;
  price: string;
  tags: string;
  image_url: string;
  sample_work_url: string;
  job_due_date: string;
  due_date_index: number;
  template_name: null;
  status: number;
  is_active: boolean;
  is_blocked: boolean;
  is_house_member: boolean;
  related_jobs: null;
  company: number;
  industry: number;
  workflow: number;
  user: null;
  created_by: null;
  assigned_to: null;
  house_member: any[];
}
