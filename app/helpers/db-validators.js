const throwJsonError = require("../errors/throw-json-error");
const {
  findUserByEmail,
  findUserById,
} = require("../repositories/users.repository");

const {
  findTechnologyIdByName,
  findTechnologyNameById,
} = require("../repositories/technologies.repository");

const isExistingEmail = async (email = "") => {
  const emailExists = await findUserByEmail(email);
  if (emailExists) {
    throwJsonError(400, `Email: ${email} already exists.`);
  }
};
const isExistingUserById = async (id) => {
  const userExists = await findUserById(id);
  if (!userExists) {
    throwJsonError(400, `User with id: ${id} does not exist.`);
  }
};

const isUserActive = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throwJsonError(400, `User does not exist.`);
  }
  if (!user.verifiedAt) {
    throwJsonError(400, `User with email: ${email} is not active.`);
  }
};

const isTechnologyExistingByName = async (name) => {
  const tech = await findTechnologyIdByName(name);
  if (!tech) {
    throwJsonError(400, `Technology with name: ${name} does not exist.`);
  }
  return tech.id;
};

const isTechnologyExistingById = async (id) => {
  const tech = await findTechnologyNameById(id);
  if (!tech) {
    throwJsonError(400, `Technology with id: ${id} does not exist.`);
  }
};

module.exports = {
  isExistingEmail,
  isExistingUserById,
  isUserActive,
  isTechnologyExistingByName,
  isTechnologyExistingById,
};
