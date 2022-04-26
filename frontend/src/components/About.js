function About() {
  return (
    <>
      <p>
        Simple project to learn MERN stack, applying it to the industry I work
        in.
      </p>
      <p>Source code can be found here.</p>
      <p>
          Quote calculation calls a flask API which is wrapping a GLM model batched train in python.
          New claims are stored in MongoDB.
      </p>
    </>
  );
}

export default About;
