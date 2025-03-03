import { useDocumentTitle } from "usehooks-ts";
import { GitHub } from "@mui/icons-material";

export function AboutRoute() {
  useDocumentTitle(`About Bonfires :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <div className="flex-row jcspb mb-1">
        <h2>About Bonfires</h2>
        <a
          href="https://github.com/endulum/bonfires"
          type="button"
          className="button neutral solid"
          target="_blank"
        >
          <GitHub />
          <span>Repo</span>
        </a>
      </div>

      <div style={{ overflow: "auto" }}>
        <p className="mb-05">
          <b>Bonfires</b> is a messaging app with a cozy, toasty flavor. Users
          can send messages to one another through <b>camps</b>, the thematic
          analogue for group chats.
        </p>

        <p className="mb-05">
          This project mimics the{" "}
          <a
            href="https://support.discord.com/hc/en-us/articles/223657667-Group-Chat-and-Calls"
            target="_blank"
          >
            Discord group chat system
          </a>
          , though not completely:
        </p>
        <ul className="list mb-1">
          <li>Camps can be created instantly with just a title provided.</li>
          <li>
            Users are "invited" individually to a camp at the existing members'
            discretion.
          </li>
          <li>Any member can change the camp's title and avatar.</li>
          <li>
            Camps have activity rolls consisting of who has the camp open, with
            a typing indicator for members who are composing a message.
          </li>
          <li>
            Likewise to Discord's freedom of individual customization across{" "}
            <i>servers</i>, users can customize their name and name color on
            both a default and per-camp basis. Bonfires also includes
            invisibility - whether you can be shown as active and typing - in
            this freedom of customization.
          </li>
          <li>
            There is a designated "owner" role granted to the camp's creator,
            and passed down to the next earliest invited member. Only owners can
            kick members and delete the camp.
          </li>
          <li>
            Messages can be edited by the sender, and deleted by the sender or
            camp owner.
          </li>
          <li>
            Messages can be freely pinned and unpinned, with a limit of twenty
            pins per camp.
          </li>
          <li>
            Messages use{" "}
            <a href="https://commonmark.org/help/">limited markdown.</a>{" "}
            Supported markdown formats are:
            <ul className="mt-05">
              <li>First- to third-level headings</li>
              <li>Basic formatting: bold, italic, strikethrough</li>
              <li>Links</li>
              <li>Images</li>
              <li>Lists, both ordered and unordered</li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
