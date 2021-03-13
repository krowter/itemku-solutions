const solution = (record) => {
  const chat = new Chat();

  chat.importRecord(record);
  const history = chat.exportRecord();

  return history;
};

const ACTION = {
  Enter: Symbol("Enter"),
  Leave: Symbol("Leave"),
};

class Chat {
  constructor() {
    this.history = [];
    this.members = [];
  }

  importRecord(record) {
    record.forEach((entry) => {
      const { action, userId, userName } = this._parseEntry(entry);

      switch (action) {
        case "Enter":
          this._memberEnter({ userId, userName });
          break;
        case "Leave":
          this._checkMemberValidity(userId);
          this._memberLeave(userId);
          break;
        case "Change":
          this._checkMemberValidity(userId);
          this._memberChangeName({ userId, newName: userName });
          break;

        default:
          throw new Error("Unrecognized action");
      }
    });
  }

  exportRecord() {
    return this.history.map((entry) => {
      const user = this.members[entry.userId];
      const action = entry.getText();

      return user.name + " " + action + ".";
    });
  }

  _memberEnter({ userId, userName }) {
    this.history.push(new UserAction(userId, ACTION.Enter));
    this.members[userId] = new User(userId, userName);
  }

  _memberLeave(userId) {
    this.history.push(new UserAction(userId, ACTION.Leave));
  }

  _memberChangeName({ userId, newName }) {
    this.members[userId].changeName(newName);
  }

  _checkMemberValidity(userId) {
    if (this.members[userId] === undefined) {
      throw new Error(`User with ID ${userId} not exist`);
    }
  }

  _parseEntry(recordEntry) {
    const [action, userId, userName] = recordEntry.split(" ");
    return { action, userId, userName };
  }
}

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  changeName(newName) {
    this.name = newName;
  }
}

class UserAction {
  constructor(userId, action) {
    this.userId = userId;
    this.action = action;
  }

  getText() {
    switch (this.action) {
      case ACTION.Enter:
        return "came in";
      case ACTION.Leave:
        return "has left";
      default:
        break;
    }
  }
}

module.exports = { solution };
