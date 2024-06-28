export default function Page({ user }) {
  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const capitalizeName = (firstName, lastName) => {
    const first = capitalizeFirstLetter(firstName);
    const last = capitalizeFirstLetter(lastName);
    return `${first} ${last}`;
  };
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="cardd">
        <div className="upper">
          <img
            src={user?.banner?.url}
            className="img-fluid"
            onError={(event) => {
              event.target.src = "https://i.imgur.com/Qtrsrk5.jpg";
            }}
          />
        </div>

        <div className="user text-center">
          <div className="profile">
            <img
              src={user?.logo?.url}
              className="rounded-circle"
              width="80"
              onError={(event) => {
                event.target.src =
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTb3Fp_DoCmuMr9Iktvv-QsPB4eQuN-DTTD0-pcCvSTGjlm0y0AJ7K-ZoCLMmBBUhLU0&usqp=CAU";
              }}
            />
          </div>
        </div>

        <div className="mt-5 text-center">
          <h4 className="mb-0">
            {capitalizeName(user?.firstName, user?.lastName)}
          </h4>
          <span className="text-muted d-block mb-2">{user?.tagLine}</span>

          {/* <button className="btn btn-primary btn-sm follow">Follow</button> */}

          {/* <div className="d-flex justify-content-between align-items-center mt-4 px-4">
            <div className="stats">
              <h6 className="mb-0">Followers</h6>
              <span>8,797</span>
            </div>

            <div className="stats">
              <h6 className="mb-0">Projects</h6>
              <span>142</span>
            </div>

            <div className="stats">
              <h6 className="mb-0">Ranks</h6>
              <span>129</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
