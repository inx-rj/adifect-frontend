const ProfileIconListItem = ({ icon, title, value, url }) => {
  return (
    <li className="flex items-center gap-2">
      {icon && (
        <i className="bg-theme w-9 h-9 flex-center rounded-full p-2 text-white">
          {icon}
        </i>
      )}
      <div className="w-[calc(100%-35px)]">
        {title && <label className="block text-[#71757B]">{title}</label>}
        {url ? (
          <a target="_blank" href={url} rel="noreferrer">
            {value}
          </a>
        ) : (
          <p>{value}</p>
        )}
      </div>
    </li>
  );
};

export default ProfileIconListItem;
