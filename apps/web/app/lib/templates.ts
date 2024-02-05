import { getLocalizedValue } from "@formbricks/lib/i18n/utils";
import { TProduct } from "@formbricks/types/product";
import { TSurveyQuestion } from "@formbricks/types/surveys";
import { TTemplate } from "@formbricks/types/templates";

export const replaceQuestionPresetPlaceholders = (
  question: TSurveyQuestion,
  product: TProduct
): TSurveyQuestion => {
  if (!product) return question;
  const newQuestion = structuredClone(question);
  const defaultLanguageSymbol = product.languages["_default_"];
  if (newQuestion.headline) {
    newQuestion.headline = getLocalizedValue(newQuestion.headline, defaultLanguageSymbol).replace(
      "{{productName}}",
      product.name
    );
  }
  if (newQuestion.subheader) {
    newQuestion.subheader = getLocalizedValue(newQuestion.subheader, defaultLanguageSymbol)?.replace(
      "{{productName}}",
      product.name
    );
  }
  return newQuestion;
};

// replace all occurences of productName with the actual product name in the current template
export const replacePresetPlaceholders = (template: TTemplate, product: any) => {
  const preset = structuredClone(template.preset);
  preset.name = preset.name.replace("{{productName}}", product.name);
  preset.questions = preset.questions.map((question) => {
    return replaceQuestionPresetPlaceholders(question, product);
  });
  return { ...template, preset };
};
