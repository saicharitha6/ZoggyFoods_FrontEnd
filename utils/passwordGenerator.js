class PasswordGenerator {
  static generatePassword(username, email, length = 12) {
    // Combine username and email to create a more personalized string
    const combinedString = `${username}${email}`;

    // Shuffle the characters in the combined string
    const shuffledString = PasswordGenerator.shuffleString(combinedString);

    // Take the first 'length' characters to create the password
    const password = shuffledString.slice(0, length);

    return password;
  }

  // Function to shuffle characters in a string
  static shuffleString(str) {
    const array = str.split("");
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
  }
}

export default PasswordGenerator;
