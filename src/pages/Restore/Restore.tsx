import { createRestore } from "@/services/actions";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function Restore() {
  const [fileName, setFileName] = useState("");
  const { mutate } = useMutation({
    mutationFn: createRestore,
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate(fileName);
        }}
      >
        <input
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          type="text"
          name="BackupFileName"
        />
      </form>
    </div>
  );
}
