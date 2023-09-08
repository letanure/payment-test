"use client";
import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";

function isValidHttpUrl(string: string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export default function Home() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "";
  const redirectToIsValidUrl = isValidHttpUrl(redirectTo);
  const redirectAfter = Number(searchParams.get("redirectAfter")) || 2;

  console.log("redirectToIsValidUrl1", redirectToIsValidUrl, redirectAfter);
  if (redirectToIsValidUrl) {
    setTimeout(() => {
      window.location.assign(redirectTo);
    }, redirectAfter * 1000);
  }

  return (
    <main className="content">
      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        Fake Payment
      </h1>

      <br />

      {redirectToIsValidUrl && redirectTo && (
        <p>
          Redirecting to <b>{redirectTo}</b> after <b>{redirectAfter}</b>{" "}
          seconds
        </p>
      )}
      {!redirectToIsValidUrl && (
        <div>
          <p>
            Add a param in the url with the url to redirect to, for example:
          </p>
          <br />
          <code>
            <a href="https://payment-test-olx.vercel.app/?redirectTo=https://google.com">
              https://payment-test-olx.vercel.app/?redirectTo=https://google.com
            </a>
          </code>
          <br />
          <br />
          <p>
            and optionally a param with the number of seconds to wait before
            redirecting, for example:
          </p>
          <br />
          <code>
            <a href="https://payment-test-olx.vercel.app/?redirectTo=https://google.com&redirectAfter=5">
              https://payment-test-olx.vercel.app/?redirectTo=https://google.com&redirectAfter=5
            </a>
          </code>
        </div>
      )}

      <br />
      <br />

      {/* <button
        type="button"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Success
      </button>
      <button
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Error
      </button> */}
    </main>
  );
}
