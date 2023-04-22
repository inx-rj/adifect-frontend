import ProfileIconListItem from "./ProfileIconListItem";

interface UserAboutType {
  title: string;
  description: string;
  iconList: { title: string; value: string; icon: JSX.Element; url?: string }[];
}

const UserAbout = (props: UserAboutType) => {
  const { title, description, iconList } = props;
  return (
    <>
      <h5 className="card-page-title text-base mb-4">{title}</h5>
      <p className="card-page-info text-sm">{description}</p>
      <ul className="text-sm flex gap-3">
        {iconList?.map((item) => (
          <>
            {item.value && item?.url !== null && (
              <ProfileIconListItem
                icon={item.icon}
                title={item.title}
                value={item?.value}
                url={item?.url}
              />
            )}
          </>
        ))}
      </ul>
    </>
  );
};

export default UserAbout;
