import BadgeUI from "components/common/badge/BadgeUI";
import Title from "components/common/pageTitle/Title";
import CardWithBorder from "components/common/card/CardWithBorder";

const JobList = ({ title, ordering, company }) => {
  return (
    <>
      <div className="my-7">
        <Title title={title} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-1">
        {[1, 2, 3, 4, 5]?.map((item, index) => (
          <CardWithBorder
            key={index}
            url={`/jobs/details/14`}
            title="Proident proident"
            desc=" Odio nostrud lorem voluptates quis a eos voluptates cumque quia amet ut"
            content={
              <>
                <div className="mt-4 mb-2">
                  <BadgeUI
                    variant="review"
                    customClass="max-w-max text-sm font-semibold"
                  >
                    Applied
                  </BadgeUI>
                </div>
                <div className="mb-2 text-base font-semibold">
                  Due on: {"2023-04-19"}
                </div>

                <div className="flex flex-wrap gap-2">
                  {/* {item.skills?.slice(0, 5)?.map((data, index) => { */}
                  {/* return ( */}
                  <span className="">
                    <BadgeUI
                      variant="primary"
                      customClass="max-w-max text-sm font-semibold"
                    >
                      {"html"}
                    </BadgeUI>
                  </span>
                  {/* ); */}
                  {/* })} */}
                </div>
              </>
            }
          />
        ))}
      </div>
    </>
  );
};

export default JobList;
