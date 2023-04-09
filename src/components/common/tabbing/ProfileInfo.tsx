// import { useAppSelector } from '../../../../redux/store';
// import { DASHBOARD_PROJECT_ROUTE } from 'routes/baseRoutes';
// import { projectOverviewInterface } from '../../../../interface/project/ProjectDetailInterface';
// import { GET_PROJECT_DETAILS_OVERVIEW } from '../../../../redux/reducers/projects/projectDetail/projectDetailsOverview.slice';

import { BorderColorOutlined, StarRounded } from '@mui/icons-material';
import { Images } from 'helper/images';
import { useParams, Link } from 'react-router-dom';

const ProfileInfo = () => {
  const { id } = useParams();

  return (
    <div className="mb-5 flex justify-between text-white relative z-[1] gap-2">
      <div className="left flex-[calc(100%-135px)]">
        <div className="flex gap-3">
          <div className='img img-cover border-2 rounded-full overflow-hidden w-12 sm:w-[65px] xl:w-[75px] h-12 sm:h-[65px] xl:h-[75px] bg-slate-400' >
            <img src={Images.Logo} alt='profile logo' />
          </div>
          <div className="w-[calc(100%-65px)] xl:w-[calc(100%-75px)]">
            <h3 className="text-lg  font-bold inline-flex items-center gap-2 text-white  capitalize">
              John Doe
              <span className="bg-theme/[.4] py-1 px-3 text-white text-sm rounded-3xl ml-4 flex items-center gap-1"><StarRounded fontSize='small' />4.8</span>
            </h3>
            <p className="my-2">Digital marketing professional, working out of sunny Key West FL </p>
            <div className='flex gap-2 [&>div:not(:first-child)]:border-l-2 [&>div:not(:first-child)]:pl-2' >
              <div>
                <p className='font-bold' >368</p>
                <label>Total Jobs</label>
              </div>
              <div>
                <p className='font-bold' >07</p>
                <label>Companies</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <Link to={`/`} className="btn btn-primary flex items-center gap-1 px-3 py-2 text-[0] xl:text-sm">
          <BorderColorOutlined fontSize='small' />Edit Project
        </Link>
      </div>
    </div>
  );
};

export default ProfileInfo;
