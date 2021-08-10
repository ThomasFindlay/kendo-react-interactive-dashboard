const jobViews = [
  {
    id: 1,
    job: "Full-Stack Developer",
    views: 150,
  },
  {
    id: 2,
    job: "Mobile Android Developer",
    views: 25,
  },
  {
    id: 3,
    job: "JavaScript Developer",
    views: 69,
  },
  {
    id: 4,
    job: "Python Developer",
    views: 45,
  },
];

const TotalJobViews = props => {
  return (
    <div>
      <div className="">
        <ul className="totalJobViewsGrid">
          {jobViews.map(job => {
            return (
              <li className="jobViewsBlock" key={job.id}>
                <span className="jobTitle">{job.job}</span>

                <div className="jobViewsContainer">
                  <span className="jobViews">{job.views}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TotalJobViews;
