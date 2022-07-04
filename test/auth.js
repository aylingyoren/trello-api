const fetch = require("node-fetch");

const PORT = process.env.PORT || 5005;

/**
 * Test auth path
 *
 * @return  {Object}  Result object
 */
export async function testAuth() {
    try {
        // Try to auth
        let request = await fetch(`http://localhost:${ PORT }/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "Test",
                pwd: "LOLKEK",
            }),
        });

        // Get JSON output
        let result = await request.json();

        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export default testAuth;