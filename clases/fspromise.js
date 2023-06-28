import fs from "fs/promise"

fs.readFile('./fyh.txt', 'utf-8')
.then(data => console.log(data))
.catch(error => console.log(error))

try{
    const data = await fs.readFile('./fyh.txt', 'utf-8');
    console.log('awaited data: ${data}');
} catch (e) {
    console.log(e);
}
