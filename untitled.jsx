

const currentDate = new Date();
    const startTime = new Date(currentDate.getTime() + (30 * 60 * 1000)).toLocaleString();
    const endTime = new Date(currentDate.getTime() + (60 * 60 * 1000)).toLocaleString();
    <Text>Start Time </Text>
          <Text>{startTime}</Text>
          <Text>End time </Text>
          <Text>{endTime}</Text>