import React, { useState, useEffect } from "react";
import { Badge, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./SelectTablePage.css";

function SelectTablePage() {
  const navigate = useNavigate();

  const [tableStart, setTableStart] = useState();
  const [filteredResults, setFilteredResults] = useState();
  const { state } = useLocation();
  const { tables, name } = state;
  const [value, setValue] = useState();
  const [indentedTable, setindentedTable] = useState([]);

  const handleChange = (event) => {
    var initial = event.target.value;
    setValue(initial);
    let indented = [];
    const checkInitials = (table) => {
      let tableString = table.title.split("");
      let before = tableString.slice(0, tableString.indexOf("|")).join("");
      if (initial === before) {
        indented.push(
          tableString
            .slice(tableString.lastIndexOf("|") + 1, tableString.length)
            .join("")
        );
        setindentedTable(indented);
      }
    };
    tables.forEach(checkInitials);
  };

  const nextButton = () => {
    if (indentedTable.length === 0) {
      console.log("TODO - Go to SelectColumnsPage");
    } else {
      navigate("/selectIndentedTable", {
        state: { tables: tables, intendedTables: indentedTable, name: name },
      });
    }
  };

  useEffect(() => {
    var newTable = [];
    const onlyTitle = (item1) => {
      newTable.push(item1.title);
    };
    tables.forEach(onlyTitle);
    var table2 = [];
    const check = (item) => {
      let str = item.split("");
      if (str.includes("|")) {
        let start = str.slice(0, str.indexOf("|")).join("");
        if (!table2.includes(start)) {
          table2.push(start);
          setTableStart(table2);
          setFilteredResults(table2);
        }
      } else {
        table2.push(str.join(""));
        setTableStart(table2);
        setFilteredResults(table2);
      }
    };
    newTable.forEach(check);
  }, []);

  const searchItems = (searchValue) => {
    if (searchValue !== "") {
      const filteredData = tableStart.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else setFilteredResults(tableStart);
  };

  return (
    <div>
      <div className="header">
        <Row className="icons">
          <Col>
            <ArrowBackIcon
              onClick={() => navigate("/selectSourcePage")}
              fontSize="large"
            />
          </Col>
          <Col>
            <HomeIcon onClick={() => navigate("/homePage")} fontSize="large" />
          </Col>
          <Col>
            <h6>
              <Badge bg="dark">
                <ChatIcon fontSize="medium" />
                CHAT
              </Badge>
            </h6>
          </Col>
        </Row>
      </div>

      <div>
        <Row>
          <Col>
            <h1 className="heading-primary">Select Table</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5 className="heading-secondary">
              {name} has following tables ready for import. Please select the
              table you would like to import.
            </h5>
          </Col>
        </Row>
      </div>
      <Row>
        <Col></Col>
        <Col>
          <div className="filter-table">
            <input
              placeholder="filter"
              type="text"
              onChange={(e) => searchItems(e.target.value)}
            />
          </div>
        </Col>
        <Col></Col>
      </Row>

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          {filteredResults?.map((value1) => (
            <FormControlLabel
              value={value1}
              control={<Radio />}
              label={value1}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Row>
        <Col></Col>
        <Col sm={3}>
          <Button
            className="next-button"
            variant="danger"
            size="lg"
            disabled={!value}
            onClick={nextButton}
          >
            Next
          </Button>{" "}
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default SelectTablePage;
