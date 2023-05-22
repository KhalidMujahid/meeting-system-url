import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  FormGroup,
  Modal,
  Row,
} from "react-bootstrap";

function App() {
  const [input, setInput] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
  });
  const [show, setShow] = useState(false);
  const [link, setLink] = useState("");
  const [meetings, setMeetings] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    const { fname, lname, phone, email } = input;

    if (!fname || !lname || !phone || !email) {
      window.alert("Credentials are required!");
      return;
    }

    await fetch(`${import.meta.env.VITE_BASE_URL}/api/attend/create`, {
      body: JSON.stringify({
        fname: fname,
        lname: lname,
        phone: phone,
        email: email,
        link: link,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.alert("An message has been sent to your email");
      })
      .catch((error) => console.log(JSON.stringify(error, null, 3)));

    setInput({
      fname: "",
      lname: "",
      phone: "",
      email: "",
    });
    setShow(false);
  }

  const handle = (value) => {
    setShow(true);
    setLink(value);
  };

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const fetchMeeting = async () => {
      await fetch(`${import.meta.env.VITE_BASE_URL}/api/posts`)
        .then((res) => res.json())
        .then((response) => setMeetings(response))
        .catch((error) => console.log(error));
    };
    fetchMeeting();
  }, []);

  return (
    <>
      {/* Modal */}
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup className="mt-3">
            <FormControl
              name="fname"
              value={input.fname}
              type="text"
              placeholder="First name"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <FormControl
              name="lname"
              type="text"
              value={input.lname}
              placeholder="Last name"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <FormControl
              name="phone"
              type="text"
              value={input.phone}
              placeholder="Phone number"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <FormControl
              name="email"
              type="email"
              placeholder="example@gamil.com"
              onChange={handleChange}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Send link</Button>
          <Button variant="danger" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <header className="m-3">
          <h3 className="text-uppercase">meeting blog</h3>
        </header>
        <hr />
        <main>
          <Row>
            {meetings.map((meeting) => (
              <Col sm={1} md={6} key={meeting._id}>
                <div className="card">
                  <div className="card-header">
                    <h5 className="lead">Title</h5>
                  </div>
                  <div className="card-body">
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Nostrum nemo, numquam illum eos sunt tempore officiis
                      excepturi aut illo vel non voluptas facere impedit sequi
                      blanditiis molestias corrupti, quae eaque!
                    </p>
                  </div>
                  <div className="card-footer">
                    <Button onClick={() => handle(meeting.post_link)}>
                      Register
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </main>
      </Container>
    </>
  );
}

export default App;
