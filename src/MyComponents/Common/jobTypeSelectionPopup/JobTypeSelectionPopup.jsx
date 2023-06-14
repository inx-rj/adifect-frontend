import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react'
import { CREATE_JOB_TYPES } from '../../../helper/utility/constants';
import CustomPopup from '../CustomPopup';
import { jobDetailsTitle } from '../../../utils/validations'
import { useNavigate } from 'react-router-dom';

const JobTypeSelectionPopup = ({ openJobTypeSelectionPopup, setOpenJobTypeSelectionPopup }) => {

    const navigate = useNavigate();

    // JobType Selection modal states
    const [jobTypeRadioVal, setJobTypeRadioVal] = React.useState(CREATE_JOB_TYPES.MEDIA);

    // JobType Selection modal handling functions
    const handleJobTypeSelectionPopupClose = () => {
        setOpenJobTypeSelectionPopup(false);
    };

    const handleNextButton = () => {
        // console.log({ jobTypeRadioVal }, 'handleCreateJobSelection')
        navigate('/jobs/add', {
            state: {
                selectedJobType: jobTypeRadioVal
            }
        });
    }

    return (
        <CustomPopup
            dialogTitle="Select Type to Create a Job"
            dialogContent={
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={jobTypeRadioVal}
                    onChange={({ target }) => setJobTypeRadioVal(target.value)}
                >
                    <FormControlLabel className="m-0 border border-[#71757b33] rounded" value={CREATE_JOB_TYPES.MEDIA} control={<Radio />} label={jobDetailsTitle(CREATE_JOB_TYPES.MEDIA)} />
                    <FormControlLabel className="m-0 border border-[#71757b33] rounded my-3" value={CREATE_JOB_TYPES.SMS} control={<Radio />} label={jobDetailsTitle(CREATE_JOB_TYPES.SMS)} />
                    <FormControlLabel className="m-0 border border-[#71757b33] rounded" value={CREATE_JOB_TYPES.TEXT_COPY} control={<Radio />} label={jobDetailsTitle(CREATE_JOB_TYPES.TEXT_COPY)} />
                </RadioGroup>
            }
            openPopup={openJobTypeSelectionPopup}
            closePopup={handleJobTypeSelectionPopupClose}
            mainActionHandler={() => handleNextButton(jobTypeRadioVal)}
            mainActionTitle="Next"
        />
    )
}

export default JobTypeSelectionPopup;
