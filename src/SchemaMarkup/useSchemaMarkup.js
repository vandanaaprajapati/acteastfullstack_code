import { useEffect } from "react";
import { GenerateSchema } from "./GenerateSchema.js"; 

const useSchemaMarkup = (schemaType, schemaData) => {
  useEffect(() => {
    if (!schemaType) return;

    const schema = GenerateSchema(schemaType, schemaData);
    if (!schema) return;

    const existingSchema = document.getElementById("json-ld-schema");
    if (existingSchema) {
      existingSchema.remove();
    }


    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "json-ld-schema";
    script.textContent = JSON.stringify(schema, null, 2);

    document.head.appendChild(script);

    console.log("✅ Schema Markup Injected:", schema);

    
    return () => {
      script.remove();
    };
  }, [schemaType, schemaData]);
};

export default useSchemaMarkup;
