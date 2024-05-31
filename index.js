const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

let students = [];  
let nextId = 0;     
let nextTodoId = 0;  



// Add a student
app.post('/students', (req, res) => {
  const { name, age, major, yearlevel, address } = req.body;
  if (!name || !age || !major || !yearlevel || !address) {
    return res.status(400).json({ error: 'Name, age, major, yearlevel and address are required' });
  }

  const newStudent = { id: nextId++, name, age, major, yearlevel, address };
  students.push(newStudent);
  res.status(201).json({message:'The Student Information are now Successfully Added'});
});

// Edit a student
app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { name, age, major, yearlevel, address } = req.body;

  const student = students.find(s => s.id == id);
  if (!student) {
    return res.status(404).json({ error: 'The Student that you want to Edit are not Found' });
  }

  if (name) student.name = name;
  if (age) student.age = age;
  if (major) student.major = major;
  if (major) student.Yearlevel = yearlevel;
  if (major) student.Address = address;

  res.json({ message: 'You can now Edit the Student Record', student });
});

// Delete a student
app.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  const studentIndex = students.findIndex(s => s.id == id);
  if (studentIndex === -1) {
    return res.status(404).json({ error: 'The Student Record are might Deleted' });
  }
  students.splice(studentIndex, 1);

  if (students.length === 0) {
    nextId = 0;
  }
  res.json({ message: 'This Student record are Successfully Deleted' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});